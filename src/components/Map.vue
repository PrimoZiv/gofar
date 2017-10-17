<template>
    <div>
        <div id="myChart"></div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/map/js/china')
require('echarts/lib/chart/map')
require('echarts/lib/coord/geo/Geo')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
    name: 'Map',
    data() {
        return {
            places: [
                { name: '山西', selected: true },
                { name: '四川', selected: true },
                { name: '内蒙古', selected: true },
                { name: '北京', selected: true },
                { name: '福建', selected: true },
                { name: '重庆', selected: true },
                { name: '广东', selected: true }
            ]
        }
    },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            // let map = this
            var data = [
                { name: '怀仁', value: 300 },
                { name: '成都', value: 300 },
                { name: '峨眉山', value: 200 },
                { name: '深圳', value: 200 },
                { name: '重庆', value: 100 },
                { name: '大同', value: 50 },
                { name: '太原', value: 100 },
                { name: '厦门', value: 100 },
                { name: '泉州', value: 100 },
                { name: '惠州', value: 50 },
                { name: '呼和浩特', value: 200 },
                { name: '鄂尔多斯', value: 200 },
                { name: '北京', value: 100 }
            ]
            var geoCoordMap = {
                '成都': [104.06, 30.67],
                '峨眉山': [103.761263, 29.582024],
                '怀仁': [112.433387, 39.331261],
                '大同': [113.3, 40.12],
                '太原': [112.53, 37.87],
                '深圳': [114.07, 22.62],
                '重庆': [106.54, 29.59],
                '泉州': [118.58, 24.93],
                '厦门': [118.1, 24.46],
                '惠州': [114.4, 23.09],
                '呼和浩特': [111.65, 40.82],
                '鄂尔多斯': [109.781327, 39.608266],
                '北京': [116.46, 39.92]
            }
            var convertData = function(data) {
                var res = []
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name]
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        })
                    }
                }
                return res
            }
            let myChart = echarts.init(document.getElementById('myChart'))
            let option = {
                title: {
                    text: '那些我曾去过的地方',
                    left: 'center',
                    textStyle: {
                        color: '#333',
                        fontSize: 28
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                legend: {
                    orient: 'vertical',
                    y: 'bottom',
                    x: 'right',
                    data: ['Mark'],
                    textStyle: {
                        color: '#000'
                    }
                },
                geo: {
                    map: 'china',
                    roam: true,
                    scaleLimit: {
                        min: 1,
                        max: 10
                    },
                    lebel: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(103, 198, 230, 0.3)'
                        },
                        emphasis: {
                            areaColor: 'rgba(103, 198, 230, 0.3)'
                        }
                    }
                },
                series: [
                    {
                        name: 'Mark',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: function(val) {
                            return val[2] / 10
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF8973'
                            }
                        }
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data.sort(function(a, b) {
                            return b.value - a.value
                        }).slice(0, 6)),
                        symbolSize: function(val) {
                            return val[2] / 20
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF2800',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                    // , {
                    //     name: '中国',
                    //     type: 'map',
                    //     roam: true,
                    //     scaleLimit: {
                    //         min: 1,
                    //         max: 5
                    //     },
                    //     mapType: 'china',
                    //     label: {
                    //         normal: {
                    //             show: false
                    //         },
                    //         emphasis: {
                    //             show: true
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //         },
                    //         emphasis: {
                    //             areaColor: '#67C6E6',
                    //             shadowColor: 'rgba(40, 40, 40, 0.7)',
                    //             shadowBlur: 10,
                    //             shadowOffsetX: 1,
                    //             shadowOffsetY: -1
                    //         }
                    //     },
                    //     data: map.places
                    // }
                ]
            }
            // 绘制图表
            myChart.setOption(option)
        }
    }
}
</script>

<style lang="scss" scoped>
#myChart {
    margin-top: 50px;
    height: 750px;
}
</style>
