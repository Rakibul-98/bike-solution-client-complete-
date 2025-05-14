import { useGetAllOrdersQuery } from "../../../../../redux/features/orders/ordersApi";
import { useGetAllProductsQuery } from "../../../../../redux/features/products/productsApi";
import { useGetAllUsersQuery } from "../../../../../redux/features/users/usersApi";
import {
  ItemType,
  OrderType,
  UserType,
} from "../../../../../interfaces/interfaces";
import { useMemo } from "react";
import Charts from "./Charts";

export default function Overview() {
  const {
    data: products,
    isLoading: productsLoading,
    error: productError,
  } = useGetAllProductsQuery([{ name: "limit", value: 4 }]);

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useGetAllUsersQuery(undefined);

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetAllOrdersQuery(undefined);

  const totalRevenue = useMemo(() => {
    if (!orders?.data) return 0;

    return orders.data.reduce(
      (acc: number, order: OrderType) => acc + (order.totalAmount || 0),
      0
    );
  }, [orders]);

  const totalProducts =
    !productsLoading && !productError ? products?.data?.totalData ?? 0 : 0;

  const totalUsers =
    !usersLoading && !usersError ? users?.data?.length ?? 0 : 0;

  const totalOrders =
    !ordersLoading && !ordersError ? orders?.data?.length ?? 0 : 0;

  const productColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "category", label: "Category", filterable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "available_quantity", label: "Stock", sortable: true },
  ];

  const userColumns = [
    { key: "user_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Member since" },
    { key: "isBlocked", label: "Status" },
  ];

  const orderColumns = [
    { key: "_id", label: "Order ID" },
    { key: "user_name", label: "Customer" },
    { key: "totalPrice", label: "Amount" },
    { key: "createdAt", label: "Date" },
    { key: "orderStatus", label: "Status" },
  ];

  const stats = [
    {
      title: "Available Products",
      value: totalProducts,
      color: "text-secondary",
    },
    {
      title: "Orders So Far",
      value: totalOrders,
      color: "text-primary",
    },
    {
      title: "Total Users",
      value: totalUsers,
      color: "text-secondary",
    },
    {
      title: "Total Revenue",
      value: totalRevenue,
      color: "text-primary",
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-4  gap-4 mb-3">
        {stats.map(({ title, value, color }, index) => (
          <div
            key={index}
            className="shadow-xl p-4 rounded-lg text-center w-full h-40 flex flex-col justify-center"
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className={`text-4xl font-mono font-bold ${color}`}>
              {value ?? "Loading..."}
            </p>
          </div>
        ))}
      </div>
      <Charts
        products={products?.data?.result ?? []}
        orders={orders?.data ?? []}
      />
      <div className="overflow-x-auto py-5">
        <h3 className="text-2xl font-mono mb-1">Latest Products</h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {productColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  <div className="inline-flex items-center gap-2">
                    <p>{column.label}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {totalProducts > 0 &&
              products?.data?.result?.map((product: ItemType) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {productColumns.map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-sm text-gray-700"
                    >
                      {column.key === "name" ? (
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-6 w-6">
                              <img
                                src={product.product_image}
                                alt={product.name}
                              />
                            </div>
                          </div>
                          <div className="font-semibold">{product.name}</div>
                        </div>
                      ) : column.key === "available_quantity" ? (
                        <span
                          className={`px-2 py-1 text-white ${
                            product.available_quantity < 20
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        >
                          {product.available_quantity}
                        </span>
                      ) : (
                        product[column.key as keyof typeof product]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto mt-5">
        <h3 className="text-2xl font-mono mb-1">Users</h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {userColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.data?.slice(0, 4).map((user: UserType) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{user?.user_name}</h4>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {user?.email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(user?.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 block lg:w-1/2 text-center rounded-full text-white text-xs font-semibold uppercase ${
                      user?.isBlocked ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto my-8">
        <h3 className="text-2xl font-mono mb-1">Orders</h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              {orderColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders?.data?.slice(0, 4).map((order: OrderType) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{order._id}</h4>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {order?.customer?.user_name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  ${order.totalAmount}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 block lg:w-1/2 text-center py-1 rounded-full text-white text-xs font-semibold uppercase ${
                      order.orderStatus.toLowerCase() === "pending"
                        ? "bg-yellow-500"
                        : order.orderStatus.toLowerCase() === "processing"
                        ? "bg-blue-500"
                        : order.orderStatus.toLowerCase() === "shipped"
                        ? "bg-purple-500"
                        : order.orderStatus.toLowerCase() === "delivered"
                        ? "bg-green-500"
                        : order.orderStatus.toLowerCase() === "cancelled"
                        ? "bg-red-500"
                        : order.orderStatus.toLowerCase() === "returned"
                        ? "bg-gray-500"
                        : "bg-lime-500"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
