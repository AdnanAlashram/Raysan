import Layout from '@/app/Layout';
import { Outlet, RootRoute, Route, Router } from '@tanstack/react-router';
import LoaderLayout from './LoaderLayout';
import { Products } from '@/features/products/Products';
import { Carts } from '@/features/carts/Carts';
import { Checkout } from '@/features/checkout/Checkout';



const rootRoute = new RootRoute({
    component: LoaderLayout

});

const layoutRoute = new Route({
    getParentRoute: () => rootRoute,
    id: 'layout',
    component: Layout,
});



const protectedWrapper = new Route({
    getParentRoute: () => layoutRoute,
    id: 'protected',
    component: () => (
        <>
            <Outlet />
        </>
    ),

});


export const protectedRoutes = [
    new Route({
        getParentRoute: () => layoutRoute,
        path: '/',
        component: Products,
    }),
    new Route({
        getParentRoute: () => layoutRoute,
        path: '/carts',
        component: Carts,
    }),
    new Route({
        getParentRoute: () => layoutRoute,
        path: '/checkout',
        component: Checkout,
    }),
];

const routeTree = rootRoute.addChildren([
   
    layoutRoute.addChildren([
        protectedWrapper.addChildren(protectedRoutes)
    ]),
]);

const router = new Router({
    routeTree,
});

export { router };

