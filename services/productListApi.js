import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.0.2.2:8000/api/user/',
    }),

    endpoints:(builder) => ({
        getAllProduct: builder.query({
            query:() => ({
                url: 'product/',
                method: 'GET'
            })
        }),
        getProductByCategory: builder.query({
            query:(category) => {
                console.log(category)
                return {
                    url: `product/${category}`,
                    method: 'GET'
                }
            }
        }),
    }),
})

export const { useGetAllProductQuery, useGetProductByCategoryQuery } = productApi