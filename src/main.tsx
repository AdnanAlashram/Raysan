
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';
import { router } from './routes/routes.tsx';
import { CartProvider } from './context/CartContext.tsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
    </QueryClientProvider>
)
