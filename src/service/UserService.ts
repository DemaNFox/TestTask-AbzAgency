import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { PositionsRootObject, TokenRootObject, UserRootObject } from "./../types/user"

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://frontend-test-assignment-api.abz.agency/api/v1/" }),
  tagTypes: ["Users"],
  endpoints: build => ({
    fetchAllUsers: build.query<UserRootObject, number[]>({
      query: ([count = 6, page = 1]) => ({
        url: "/users",
        params: {
          count: count,
          page: page,
        },
      }),
      providesTags: result => ["Users"],
    }),
    getPositions: build.query<PositionsRootObject, Array<object>>({
      query: () => ({
        url: "/positions",
      }),
    }),
    getToken: build.query<TokenRootObject, object>({
      query: () => ({
        url: "/token",
      }),
    }),
    sendUserData: build.mutation<any, any>({
      query: ([data, requestHeaders]) => ({
        url: `/users`,
        method: "POST",
        body: data,
        headers: requestHeaders,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
})
