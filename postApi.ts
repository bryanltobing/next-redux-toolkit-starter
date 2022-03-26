import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostParams = void;

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  // for server side rendering
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], PostParams>({
      query: () => ({
        url: "/posts",
      }),
    }),
  }),
});
