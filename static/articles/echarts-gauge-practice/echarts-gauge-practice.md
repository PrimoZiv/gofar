## Echarts 仪表盘实践

项目过程中遇到一个这样的需求:

![gauge](static/articles/echarts-gauge-practice/gauge.png)

这明显是一个仪表盘类型的图表，打开echarts的官方文档，可以看到有一个默认的实现，如下：

![default](static/articles/echarts-gauge-practice/default.png)

使用了默认的参数
```javascript
option = {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            detail: {formatter:'{value}%'},
            data: [{value: 50, name: '完成率'}]
        }
    ]
};
```

分析需求后，我们从以下几个方面入手

### 轴线类别

从第一张图我们可以看出，需求中的轴线不是连续的，而是被分割成了一个个的长条形状。

从官方示例来看，轴线被白色的刻度分成了很多小段，如果刻度的宽度变大，刻度变密集的话是可以达到我们想要的效果的
```javascript
option = {
    ...
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            // 去掉多余的分段
            splitNumber: 1,
            axisLine: {
                lineStyle: {
                    width: 20
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                // 刻度长度与轴线宽度一致，达到分隔的效果
                length: 20,
                // 增加刻度密度
                splitNumber: 100,
                lineStyle: {
                    // 增加刻度宽度
                    width: 3
                }
            },
            detail: {formatter:'{value}%'},
            data: [{value: 50, name: '完成率'}]
        }
    ]
};
```
经过这样修改的话，确实初步达到了我们要的效果。

![Try1](static/articles/echarts-gauge-practice/try1.png)

但是仔细看的话，会发现一个问题，指针的指向是空白处。原因就是空白的地方是刻度，而有颜色的地方是轴线。
这样的话最终指针指向的数据是不准确的，而且这个方案还有一个问题就是渐变颜色的处理。
```javascript
[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
```
官方提供的接口是分段颜色，想要做成渐变还不是很好处理。


接下来呢，考虑第二种实现方式

首先，轴线肯定是连续的，那我先把轴线隐藏掉，然后刻度加粗，拉长
```javascript
option = {
    ...
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            splitNumber: 1,
            axisLine: {
                lineStyle: {
                    width: 20,
                    // 透明度设置为0
                    opacity: 0
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                length: 20,
                splitNumber: 100,
                lineStyle: {
                    width: 3,
                    // 给点颜色
                    color: '#555'
                }
            },
            detail: {formatter:'{value}%'},
            data: [{value: 50, name: '完成率'}]
        }
    ]
};
```
![Try](static/articles/echarts-gauge-practice/try2.png)

可以看到效果有了，而且指针位置正确。

### 渐变颜色

需求中轴线的颜色是渐变的，但是文档中给定的接口是分段式的颜色，没有办法使用，再者轴线透明度已经被设置为0了。

所以只能从刻度的颜色入手。

官方文档中，刻度的颜色是如下这样的：
```javascript
// 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    globalCoord: false // 缺省为 false
}
// 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
color: {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 0.5,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    globalCoord: false // 缺省为 false
}
// 纹理填充
color: {
    image: imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
    repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
}
```
默认支持两种渐变，线性和径向渐变，从效果上看都不符合我们的要求：线性是直线方向的渐变，而径向渐变是由内而外的。即使可以勉强实现，效果肯定不好。
所以可以尝试一下使用图片纹理。

首先用PS画一个和画布一样大小的渐图案

![Linear](static/articles/echarts-gauge-practice/linear.jpg)

在配置中使用image选项
```javascript
option = {
    ...
    series:[{
        ...
        axisTick: {
            length: 20,
            splitNumber: 100,
            lineStyle: {
                color: {
                    image: document.getElementById('linear-pic'),
                    repeat: 'no-repeat'
                },
                width: 3
            }
        }
    }]
```
这样项目中的需求就可以完美解决了

![result](static/articles/echarts-gauge-practice/result.png)

### 颜色分段

颜色渐变完成了，看一下效果的话，会发现有一个明显的问题。需求中指针指向的位置之前的刻度是有渐变颜色的，后面一段则都是灰色。
而我们现在仪表盘无论指向哪里，刻度都是有颜色的。

在解决这个问题的过程中，想了很多方案，使用遮罩、修改渐变图片等等，都不能很好的解决问题。最后突然想起来一个配置项中可以使用多个仪表盘的，
我只要在数据前半段使用带渐变色的仪表盘，后半段全部用灰色的仪表盘补充，这样就可以解决问题。

这里还需要注意以下两点：
1. 由于仪表盘的值是动态的，所以每个仪表盘的开始结束位置、刻度的个数都要根据值来计算
2. 由于有两个仪表盘，最好把内容部分全部都写在一个上，另外一个确保只有轴线部分，避免出现重叠等问题

代码如下：
```javascript
calculateOption: function (params) {
    var offsetAngle = -35;
    var totalAngle = 250;
    var split = 75;
    var series = [];
    var asisWidth = 11;
    var fontSize = 30;

    // Defaults
    params = $.extend({
        min: 0,
        max: 100,
        value: 0,
        name: 'DOWNLOAD SPEED',
        type: 'gauge',
        data: [{
            value: 0,
            name: ''
        }]
    }, params);

    var startAngle = totalAngle + offsetAngle;
    var endAngle = startAngle - Math.floor((parseInt(params.value, 10) / (params.max - params.min)) * totalAngle);

    series.push({
        name: params.name,
        type: params.type,
        startAngle: startAngle,
        endAngle: endAngle,
        splitNumber: 1,
        // 轴线样式
        axisLine: {
            show: false,
            lineStyle: {
                width: asisWidth,
                opacity: 0
            }
        },
        // 分段样式
        splitLine: { show: false },
        // 刻度样式
        axisTick: {
            length: asisWidth,
            splitNumber: Math.floor((params.value / (params.max - params.min)) * split),
            lineStyle: {
                color: {
                    image: $('#xx')[0],
                    repeat: 'no-repeat'
                },
                width: 2
            }
        },
        axisLabel: { show: false },
        pointer: { show: false },
        // 指针样式
        itemStyle: {},
        title: {
            fontSize: 8,
            offsetCenter: [0, '-35%'],
            color: '#999'
        },
        detail: {
            color: '#36444b',
            fontSize: fontSize,
            offsetCenter: [0, '20%'],
            formatter: function (val) {
                return val.toFixed(2) + '\n{unit|Mbps}'
            },
            rich: {
                unit: {
                    fontSize: 10,
                    color: '#999',
                    lineHeight: 30
                }
            }
        },
        data: [{
            value: params.value,
            name: params.name
        }]
    });
    series.push({
        name: '',
        type: params.type,
        startAngle: endAngle,
        endAngle: offsetAngle,
        splitNumber: 1,
        axisLine: {
            show: false,
            lineStyle: {
                width: asisWidth,
                opacity: 0
            }
        },
        splitLine: { show: false },
        axisTick: {
            length: asisWidth,
            splitNumber: split - Math.floor((params.value / (params.max - params.min)) * 80),
            lineStyle: {
                color: '#999',
                width: 2
            }
        },
        axisLabel: { show: false },
        pointer: { show: false },
        // 指针样式
        itemStyle: {},
        title: { show: false },
        detail: { show: false }
    });
    return series;
}
```
效果如下：

![Result2](static/articles/echarts-gauge-practice/result2.png)

### 指针类型

最后，我们需要做的就是把指针改为需求中的样子，本来我以为这个应该是最简单的部分，看完官方文档后发现并没有修改指针的接口。
```javascript
{
    color: 'auto',
    borderColor: '#000',
    borderWidth: 0,
    borderType: 'solid',
    shadowBlur: ...,
    shadowColor: ...,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: ...
}
```
如上，指针配置项应该是没有办法实现类似刻度的样子。

目前还在实验中，考虑使用`markline`画一条指针，是否可行还有待验证。
