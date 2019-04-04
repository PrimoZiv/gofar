webpackJsonp([2],{"1q9s":function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{attrs:{id:"chart-map"}})},n=[],r={render:o,staticRenderFns:n};e.a=r},"6+Rd":function(t,e,a){var o=a("Ya5z");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("757bfa53",o,!0,{})},KPHA:function(t,e,a){"use strict";function o(t){a("6+Rd")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("qy1l"),r=a("SDxc"),i=a("VU/8"),s=o,c=i(n.a,r.a,!1,s,"data-v-5e4d72df",null);e.default=c.exports},MvcQ:function(t,e,a){e=t.exports=a("FZ+f")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"MapProvince.vue",sourceRoot:""}])},P8Vh:function(t,e,a){"use strict";var o=a("Icdr"),n=a.n(o),r=a("Bhwq"),i=(a.n(r),a("nUSl")),s=(a.n(i),a("HcG6")),c=(a.n(s),a("Oq2I")),l=(a.n(c),a("miEh"));a.n(l);e.a={name:"EchartsMap",data:function(){return{myChart:null}},props:["option"],mounted:function(){},watch:{option:{handler:function(){this.drawLine()},deep:!0}},methods:{drawLine:function(){this.myChart||(this.myChart=n.a.init(document.getElementById("chart-map"))),this.myChart.setOption(this.option)}}}},SDxc:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("echarts-map",{attrs:{option:t.option}})],1)},n=[],r={render:o,staticRenderFns:n};e.a=r},Ya5z:function(t,e,a){e=t.exports=a("FZ+f")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"MapPlace.vue",sourceRoot:""}])},ZEb5:function(t,e,a){"use strict";var o=a("t1kT");e.a={name:"MapProvince",data:function(){return{option:{title:{text:"",left:"center",textStyle:{color:"#333",fontSize:28}},tooltip:{trigger:"item",formatter:"{b}"},series:[{name:"中国",type:"map",roam:!0,scaleLimit:{min:1,max:5},mapType:"china",label:{normal:{show:!1},emphasis:{show:!0}},itemStyle:{normal:{},emphasis:{areaColor:"#67C6E6",shadowColor:"rgba(40, 40, 40, 0.7)",shadowBlur:10,shadowOffsetX:1,shadowOffsetY:-1}},data:[{name:"广东",selected:!0}]}]}}},mounted:function(){var t=this;this.$getData("static/data/footprint.json").then(function(e){t.option.series[0].data=e,t.$set(t.option.series,0,t.option.series[0]),t.$emit("loading")})},components:{EchartsMap:o.a}}},"atj+":function(t,e,a){"use strict";function o(t){a("mEi/")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("ZEb5"),r=a("nSvm"),i=a("VU/8"),s=o,c=i(n.a,r.a,!1,s,"data-v-d6fbb54c",null);e.default=c.exports},lPwl:function(t,e,a){e=t.exports=a("FZ+f")(!0),e.push([t.i,"#chart-map[data-v-1412e216]{height:750px}","",{version:3,sources:["/home/travis/build/PrimoZiv/gofar/src/components/map/Map.vue"],names:[],mappings:"AACA,4BACE,YAAc,CACf",file:"Map.vue",sourcesContent:["\n#chart-map[data-v-1412e216] {\n  height: 750px;\n}\n"],sourceRoot:""}])},"lT+v":function(t,e,a){var o=a("lPwl");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("18e6de28",o,!0,{})},"mEi/":function(t,e,a){var o=a("MvcQ");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("91a05d3c",o,!0,{})},nSvm:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("echarts-map",{attrs:{option:t.option}})],1)},n=[],r={render:o,staticRenderFns:n};e.a=r},qy1l:function(t,e,a){"use strict";var o=a("t1kT");e.a={name:"MapPlace",data:function(){return{data:[]}},computed:{option:function(){var t=this;return{title:{text:"",left:"center",textStyle:{color:"#333",fontSize:28}},tooltip:{trigger:"item",formatter:"{b}"},legend:{orient:"vertical",y:"bottom",x:"right",data:["Mark"],textStyle:{color:"#000"}},geo:{map:"china",roam:!0,scaleLimit:{min:1,max:10},lebel:{emphasis:{show:!1}},itemStyle:{normal:{areaColor:"rgba(103, 198, 230, 0.3)"},emphasis:{areaColor:"rgba(103, 198, 230, 0.3)"}}},series:[{name:"Mark",type:"scatter",coordinateSystem:"geo",data:t.data,symbolSize:function(t){return t[2]/10},label:{normal:{formatter:"{b}",position:"right",show:!1},emphasis:{show:!0}},itemStyle:{normal:{color:"#FF8973"}}},{name:"Top 5",type:"effectScatter",coordinateSystem:"geo",data:t.data.sort(function(t,e){return e.value[2]-t.value[2]}).slice(0,6),symbolSize:function(t){return t[2]/20},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{normal:{formatter:"{b}",position:"right",show:!0}},itemStyle:{normal:{color:"#FF2800",shadowBlur:10,shadowColor:"#333"}},zlevel:1}]}}},mounted:function(){var t=this;this.$getData("static/data/mappoint.json").then(function(e){t.data=[];for(var a=0,o=e.length;a<o;a++)t.$set(t.data,a,{name:e[a].name,value:e[a].coord.concat(e[a].value)});t.$set(t.option.series,1,t.option.series[1]),t.$emit("loading")})},components:{EchartsMap:o.a}}},t1kT:function(t,e,a){"use strict";function o(t){a("lT+v")}var n=a("P8Vh"),r=a("1q9s"),i=a("VU/8"),s=o,c=i(n.a,r.a,!1,s,"data-v-1412e216",null);e.a=c.exports}});
//# sourceMappingURL=2.129e044a41849f3ff8a5.js.map