import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import MapPlace from '@/components/MapPlace'
import MapProvince from '@/components/MapProvince'
import HelloWorld from '@/components/HelloWorld'

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
