import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import HelloWorld from '@/components/HelloWorld'

// Async load component.
const MapPlace = () => import('@/components/MapPlace')
const MapProvince = () => import('@/components/MapProvince')

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Main',
        component: Main
    }, {
        path: '/hello',
        name: 'Hello',
        component: HelloWorld
    }, {
        path: '/map-place',
        name: 'MapPlace',
        component: MapPlace
    }, {
        path: '/map-province',
        name: 'MapProvince',
        component: MapProvince
    }]
})
