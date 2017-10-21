<template>
    <div id="chart-map">
    </div>
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
            myChart: null
        }
    },
    props: ['option'],
    mounted() {
        this.drawLine()
    },
    watch: {
        option: {
            handler: function() {
                this.updateMap()
            },
            deep: true
        }
    },
    methods: {
        drawLine() {
            this.myChart = echarts.init(document.getElementById('chart-map'))
            this.myChart.setOption(this.option)
        },
        updateMap() {
            this.myChart.setOption(this.option)
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
