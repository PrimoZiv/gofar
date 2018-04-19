import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

// Async load component.
const MapPlace = () => import(/* webpackChunkName: "Map" */'@/components/map/MapPlace')
const MapProvince = () => import(/* webpackChunkName: "Map" */'@/components/map/MapProvince')
const Articles = () => import(/* webpackChunkName: "Article" */'@/components/articles/Articles')
const Notes = () => import(/* webpackChunkName: "Article" */'@/components/articles/Notes')
const ArticleDetail = () => import(/* webpackChunkName: "Article" */'@/components/articles/ArticleDetail')
const GoPhoto = () => import(/* webpackChunkName: "Album" */'@/components/album/GoPhoto')

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Main',
        component: Main
    }, {
        path: '/map-place',
        name: 'MapPlace',
        component: MapPlace
    }, {
        path: '/map-province',
        name: 'MapProvince',
        component: MapProvince
    }, {
        path: '/notes',
        component: Notes
    }, {
        path: '/articles',
        component: Articles
    }, {
        path: '/:dir/:name',
        component: ArticleDetail
    }, {
        path: '/album',
        name: 'GoPhoto',
        component: GoPhoto
    }]
})
