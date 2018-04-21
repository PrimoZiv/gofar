export default {
    install: function (Vue, options) {
        let bus = new Vue()
        Vue.prototype.$bus = (function () {
            return bus
        })()
    }
}
