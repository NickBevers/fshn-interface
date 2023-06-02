import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/HomePage.vue'
import Catalog from './views/CatalogPage.vue'
import Category from './views/CategoryPage.vue'
import Detail from './views/DetailPage.vue'
import Explore from './views/ExplorePage.vue'
import Cart from './views/CartPage.vue'
import Order from './views/OrderPage.vue'
import Filter from './views/FilterPage.vue'
import Login from './views/LoginPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            name: 'Home',
            component: Home
        },
        {
            path: '/explore', 
            name: 'Explore',
            component: Explore
        },
        {
            path: '/catalog/:name',
            name: 'Catalog', 
            component: Catalog
        },
        {
            path: '/category/:name', 
            name: 'Category',
            component: Category
        },
        {
            path: '/detail/:id',
            name: 'Detail', 
            component: Detail
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/order/:clientNumber',
            name: 'Order',
            component: Order
        },
        {
            path: '/filter',
            name: 'Filter',
            component: Filter
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})