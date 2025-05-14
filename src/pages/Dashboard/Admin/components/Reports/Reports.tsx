import { useMemo } from "react";
// import { OrderType } from "@/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAllOrdersQuery } from "../../../../../redux/features/orders/ordersApi";
// import { useGetAllProductsQuery } from "../../../../../redux/features/products/productsApi";
import { useGetAllUsersQuery } from "../../../../../redux/features/users/usersApi";
import { OrderType } from "../../../../../interfaces/interfaces";

export default function Reports() {
  // const { data: products } = useGetAllProductsQuery(undefined );
  const { data: users } = useGetAllUsersQuery(undefined);
  const { data: orders } = useGetAllOrdersQuery(undefined);

  const totalRevenue = useMemo(() => {
    if (!orders?.data) return 0;
    return orders.data.reduce(
      (acc: number, order: OrderType) => acc + (order.totalAmount || 0),
      0
    );
  }, [orders]);

  const totalOrders = orders?.data?.length ?? 0;
  const totalUsers = users?.data?.length ?? 0;

  const orderStats = useMemo(() => {
    const stats = {
      pending: 0,
      delivered: 0,
      cancelled: 0,
      paid: 0,
      processing: 0,
      shipped: 0,
      returned: 0,
    };
    if (orders?.data) {
      orders.data.forEach((order: OrderType) => {
        stats[order.orderStatus as keyof typeof stats]++;
      });
    }
    return stats;
  }, [orders]);

  const monthlyRevenueData = useMemo(() => {
    const monthMap: { [key: string]: number } = {};
    orders?.data?.forEach((order: OrderType) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthMap[month] = (monthMap[month] || 0) + (order.totalAmount || 0);
    });
    return Object.entries(monthMap).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }, [orders]);

  const monthlyOrderData = useMemo(() => {
    const monthMap: { [key: string]: number } = {};
    orders?.data?.forEach((order: OrderType) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    return Object.entries(monthMap).map(([month, orders]) => ({
      month,
      orders,
    }));
  }, [orders]);

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF4560', '#0088FE'];
  
  const statusCountMap: { [key: string]: number } = {};
  orders?.data?.forEach((order: OrderType) => {
    const status = order.orderStatus.toLowerCase();
    statusCountMap[status] = (statusCountMap[status] || 0) + 1;
  });
  const pieData = Object.entries(statusCountMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return (
    <div className="mb-5 md:px-3">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <p className="text-gray-600 mb-6">
        View and analyze sales, inventory, and other data.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue}`}
          bgColor="bg-blue-100"
          textColor="text-blue-700"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          bgColor="bg-green-100"
          textColor="text-green-700"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          bgColor="bg-yellow-100"
          textColor="text-yellow-700"
        />
        <StatCard
          title="Pending Orders"
          value={orderStats.pending}
          bgColor="bg-gray-100"
        />
        <StatCard
          title="Delivered Orders"
          value={orderStats.delivered}
          bgColor="bg-green-200"
        />
        <StatCard
          title="Cancelled Orders"
          value={orderStats.cancelled}
          bgColor="bg-red-200"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Monthly Revenue</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">Monthly Orders</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyOrderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  bgColor,
  textColor,
}: {
  title: string;
  value: string | number;
  bgColor: string;
  textColor?: string;
}) {
  return (
    <div className={`${bgColor} p-4 rounded-lg text-center`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className={`text-xl font-bold ${textColor || ""}`}>{value}</p>
    </div>
  );
}
