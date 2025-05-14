import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    LineChart, Line, PieChart, Pie, Cell, Legend
  } from 'recharts';
  import { ItemType, OrderType } from "../../../../../interfaces/interfaces";
  
  interface Props {
    products: ItemType[];
    orders: OrderType[];
  }
  
  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF4560', '#0088FE'];
  
  const Charts = ({ products, orders }: Props) => {
  
    const productStockData = products?.slice(0, 5).map((product) => ({
      name: product.name,
      Stock: product.available_quantity,
    }));
  
    const revenueData = orders?.slice(0, 7).map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      revenue: order.totalAmount,
    }));
  
    const statusCountMap: { [key: string]: number } = {};
    orders?.forEach((order) => {
      const status = order.orderStatus.toLowerCase();
      statusCountMap[status] = (statusCountMap[status] || 0) + 1;
    });
    const pieData = Object.entries(statusCountMap).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  
    return (
      <div className="grid md:grid-cols-3 gap-6 w-full my-6">
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <h4 className="text-center font-semibold mb-2">Top Product Stock</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productStockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Stock" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <h4 className="text-center font-semibold mb-2">Revenue Over Time</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default Charts;
  