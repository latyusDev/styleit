import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../src/interceptors/axios.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { setupAxiosInterceptors } from './interceptors/axios.js'

// Setup interceptors
setupAxiosInterceptors();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 3,
      refetchOnReconnect:true,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});


createRoot(document.getElementById('root')).render(
    <HelmetProvider>  
      <QueryClientProvider client={queryClient}>
            <App />
      </QueryClientProvider>
    </HelmetProvider>
  // <StrictMode>
  // </StrictMode>
)
