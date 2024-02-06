"use client"

import React from 'react'
import { QueryClient, QueryClientProvider as QueryProvider } from '@tanstack/react-query'

export default function QueryClientProvider({children}: {children: React.ReactNode}){

    const [queryClient] = React.useState(() => new QueryClient())
    return(
        <QueryProvider client={queryClient}>
            {children}
        </QueryProvider>
    )
}