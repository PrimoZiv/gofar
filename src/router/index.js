import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

// Async load component.
const MapPlace = () => import(/* webpackChunkName: "Map" */'@/components/map/MapPlace')
const MapProvince = () => import(/* webpackChunkName: "Map" */'@/components/map/MapProvince')
const Travel = () => import(/* webpackChunkName: "Travel" */'@/components/travel/Travel')
const TravelDetail = () => import(/* webpackChunkName: "Travel" */'@/components/travel/TravelDetail')
const Problems = () => import(/* webpackChunkName: "Problem" */'@/components/problems/Problems')
const ProblemDetail = () => import(/* webpackChunkName: "Problem" */'@/components/problems/ProblemDetail')

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
        path: '/travel/detail/:key',
        component: TravelDetail
    }, {
        path: '/problems',
        component: Problems
    }, {
        path: '/problems/:key',
        component: ProblemDetail
    }]
})
