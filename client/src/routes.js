import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import Order from "./pages/Order";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";
import About from "./pages/About";
import UserProfile from "./pages/UserProfile";


import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ABOUT_ROUTE, PROFILE_ROUTE } from "./utils/consts";

export const authRoutes = [
   
    {
        path: BASKET_ROUTE,
        Component: Basket
    },

]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDER_ROUTE,
        Component: Order
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PROFILE_ROUTE,
        Component: UserProfile
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },

]