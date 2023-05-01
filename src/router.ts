import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/HomePage.vue'
import Catalog from './views/CatalogPage.vue'
import Category from './views/CategoryPage.vue'
import Detail from './views/DetailPage.vue'
import Explore from './views/ExplorePage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            name: 'Home',
            component: Home
        },
        {
            path: '/catalog',
            name: 'Catalog', 
            component: Catalog
        },
        {
            path: '/category', 
            name: 'Category',
            component: Category
        },
        {
            path: '/detail',
            name: 'Detail', 
            component: Detail
        },
        {
            path: '/explore', 
            name: 'Explore',
            component: Explore
        },
    ]
})