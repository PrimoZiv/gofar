// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import fetchData from './plugins/fetch'
import {
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Button,
    Form,
    FormItem,
    Icon,
    Row,
    Col,
    Card,
    Carousel,
    CarouselItem,
    Loading
  } from 'element-ui'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(fetchData)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
