<template>
    <div id="app">
        <Navigator></Navigator>
        <router-view/>
        <FarFooter></FarFooter>
    </div>
</template>

<script>
import Navigator from './components/Navigator.vue'
import FarFooter from './components/Footer.vue'

export default {
    name: 'app',
    components: {
        Navigator,
        FarFooter
    }
}
</script>

<style>
#app {
    width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
