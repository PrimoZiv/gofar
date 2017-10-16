<template>
    <div>
        <!-- <el-card> -->
            <div id="myChart"></div>
        <!-- </el-card> -->
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/map')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
    name: 'Map',
    data() {
        return {}
    },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: { text: 'Cities' },
                tooltip: {},
                xAxis: {
                    data: ['北京', '上海', '成都', '深圳', '杭州', '广州']
                },
                yAxis: {},
                series: [{
                    name: '人气',
                    type: 'bar',
                    data: [5, 20, 36, 10, 35, 20]
                }]
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#myChart {
    margin-top: 50px;
    height: 700px;
}
</style>
