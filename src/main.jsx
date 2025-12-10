import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' //* need to add devtools
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { router } from './routes/Routes';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <div>
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
			<Toaster position="top-right" reverseOrder={false} />

    </QueryClientProvider>
  </div>,
)
