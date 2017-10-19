<template>
    <div id="chart-map"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/map/js/china'
import 'echarts/lib/chart/map'
import 'echarts/lib/coord/geo/Geo'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default {
    name: 'EchartsMap',
    data() {
        return {
        }
    },
    props: ['option'],
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            let myChart = echarts.init(document.getElementById('chart-map'))
            myChart.setOption(this.option)
        }
    }
}
</script>

<style lang="scss" scoped>
#chart-map {
    margin-top: 50px;
    height: 750px;
}
</style>
