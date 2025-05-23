import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bike-store-server-updated.vercel.app/api",
  // baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // refresh token
    const res = await fetch(
      "https://bike-store-server-updated.vercel.app/api/auth/refresh-token",
      // "http://localhost:5000/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    const user = (api.getState() as RootState).auth.user;

    if (data?.data?.token) {
      api.dispatch(
        setUser({
          user,
          token: data?.data?.token,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["products", "product", "users", "orders"],
  endpoints: () => ({}),
});
