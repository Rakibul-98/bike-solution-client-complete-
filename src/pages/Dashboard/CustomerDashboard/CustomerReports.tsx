import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { OrderType } from "../../../interfaces/interfaces";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/ordersApi";

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF4560', '#0088FE'];

const CustomerReports = () => {
  const { data: orders } = useGetAllOrdersQuery(undefined);

  const monthlyOrderData = useMemo(() => {
    const monthMap: { [key: string]: number } = {};
    orders?.data?.forEach((order: OrderType) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    return Object.entries(monthMap).map(([month, count]) => ({ month, count }));
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Reports</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Monthly Orders</h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyOrderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="shadow-lg p-4 rounded-lg bg-white">
          <h4 className="text-center font-semibold mb-2">Order Status</h4>
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
        <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
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
    </div>
  );
};

export default CustomerReports;
