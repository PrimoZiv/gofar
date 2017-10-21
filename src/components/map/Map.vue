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
        // this.drawLine()
        // 在mounted中执行效率会非常低，要找到原因！
    },
    watch: {
        option: {
            handler: function() {
                this.drawLine()
            },
            deep: true
        }
    },
    methods: {
        drawLine() {
            if (!this.myChart) {
                this.myChart = echarts.init(document.getElementById('chart-map'))
            }
            this.myChart.setOption(this.option)
        }
    }
}
</script>

<style lang="scss" scoped>
#chart-map {
    height: 750px;
}
</style>
