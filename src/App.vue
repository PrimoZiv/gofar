<template>
    <div id="app" :class="{'full-screen': isFullScreen}">
        <Navigator></Navigator>
        <div class="content" v-loading="isLoading">
            <transition name="router" mode="out-in">
                <router-view/>
            </transition>
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
            isLoading: false,
            isFullScreen: false
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
        this.$bus.$on('full-screen', (status) => {
            this.isFullScreen = status
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
html, body {
    height: 100%;
}
#app {
    width: 100%;
    margin: 0 auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;

    &>.content {
        padding-top: 50px;
        margin: 0 auto;
        width: 800px;
    }

    &.full-screen {
        overflow: hidden;
    }
}
.router-enter {
    opacity: 0;
    transform: translateX(100px);
}
.router-leave {
    opacity: 0;
    transform: translateX(-100px);
}
.router-enter-active, .router-leave-active {
    transition: all ease 0.5s;
}
</style>
