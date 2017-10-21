<template>
    <div id="app">
        <Navigator></Navigator>
        <div class="content" v-loading="isLoading">
            <router-view/>
        </div>
        <FarFooter></FarFooter>
    </div>
</template>

<script>
import Navigator from './components/Navigator.vue'
import FarFooter from './components/Footer.vue'

export default {
    name: 'app',
    data: function() {
        return {
            isLoading: false
        }
    },
    mounted: function() {
        let app = this
        this.$router.beforeEach((to, from, next) => {
            app.isLoading = true
            next()
        })
        this.$router.afterEach((to, from) => {
            app.isLoading = false
        })
    },
    methods: {
    },
    components: {
        Navigator,
        FarFooter
    }
}
</script>

<style lang="scss">
#app {
    width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;

    &>.content {
        padding-top: 50px;
    }
}
</style>
