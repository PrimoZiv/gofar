import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

// Async load component.
const MapPlace = () => import(/* webpackChunkName: "Map" */'@/components/map/MapPlace')
const MapProvince = () => import(/* webpackChunkName: "Map" */'@/components/map/MapProvince')
const Travel = () => import(/* webpackChunkName: "Travel" */'@/components/travel/Travel')
const TravelDetail = () => import(/* webpackChunkName: "Travel" */'@/components/travel/TravelDetail')
const Articles = () => import(/* webpackChunkName: "Article" */'@/components/articles/Articles')
const ArticleDetail = () => import(/* webpackChunkName: "Article" */'@/components/articles/ArticleDetail')
const Notes = () => import(/* webpackChunkName: "Article" */'@/components/notes/Notes')
// const NoteDetail = () => import(/* webpackChunkName: "Article" */'@/components/notes/NoteDetail')

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
        path: '/travel',
        component: Travel
    }, {
        path: '/travel/:key',
        component: TravelDetail
    }, {
        path: '/notes',
        component: Notes
    // }, {
    //     path: '/notes/:name',
    //     component: NoteDetail
    }, {
        path: '/articles',
        component: Articles
    }, {
        path: '/articles/:name',
        component: ArticleDetail
    }]
})
