<template>
    <div>
        <echarts-map :option="option"></echarts-map>
    </div>
</template>

<script>
import EchartsMap from './Map'
export default {
    name: 'MapPlace',
    data() {
        return {
            data: []
        }
    },
    computed: {
        option: function() {
            let self = this
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
                        data: self.data,
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
                        data: self.data.sort(function(a, b) {
                            return b.value[2] - a.value[2]
                        }).slice(0, 6),
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
                ]
            }
        }
    },
    mounted: function() {
        this.$http.get('/static/data/mappoint.json').then(result => {
            let data = result.body.data
            this.data = []
            for (let i = 0, len = data.length; i < len; i++) {
                this.$set(this.data, i, {
                    name: data[i].name,
                    value: data[i].coord.concat(data[i].value)
                })
            }
            this.$set(this.option.series, 1, this.option.series[1])
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
