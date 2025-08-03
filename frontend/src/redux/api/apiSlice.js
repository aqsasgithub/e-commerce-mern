import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE,
    credentials: 'include',
  }),
  tagTypes: ['User', 'Product', 'Order', 'Category'],
  endpoints: () => ({}),
});
