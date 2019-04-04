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
            option: {
                title: {
                    text: '',
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
                        data: [{ 'name': '广东', 'selected': true }]
                    }
                ]
            }
        }
    },
    mounted: function() {
        this.$getData('static/data/footprint.json').then(data => {
            this.option.series[0].data = data
            this.$set(this.option.series, 0, this.option.series[0])
            this.$emit('loading')
        })
    },
    components: {
        EchartsMap
    }
}
</script>

<style lang="scss" scoped>
</style>
