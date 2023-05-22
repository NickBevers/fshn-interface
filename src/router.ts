import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/HomePage.vue'
import Catalog from './views/CatalogPage.vue'
import Category from './views/CategoryPage.vue'
import Detail from './views/DetailPage.vue'
import Explore from './views/ExplorePage.vue'
import Cart from './views/CartPage.vue'

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
        }
    ]
})