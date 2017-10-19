<template>
    <div>
        <echarts-map :option="option"></echarts-map>
    </div>
</template>

<script>
import EchartsMap from './Map'
export default {
    name: 'MapProvince',
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
    components: {
        EchartsMap
    },
    computed: {
        option: function() {
            let map = this
            return {
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
                series: [
                    {
                        name: '中国',
                        type: 'map',
                        roam: true,
                        scaleLimit: {
                            min: 1,
                            max: 5
                        },
                        mapType: 'china',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                            },
                            emphasis: {
                                areaColor: '#67C6E6',
                                shadowColor: 'rgba(40, 40, 40, 0.7)',
                                shadowBlur: 10,
                                shadowOffsetX: 1,
                                shadowOffsetY: -1
                            }
                        },
                        data: map.places
                    }
                ]
            }
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
