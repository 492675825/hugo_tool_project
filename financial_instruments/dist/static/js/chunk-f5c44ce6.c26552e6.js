(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f5c44ce6"],{1148:function(t,e,a){"use strict";var i=a("a691"),n=a("1d80");t.exports="".repeat||function(t){var e=String(n(this)),a="",r=i(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(a+=e);return a}},"408a":function(t,e,a){var i=a("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=i(t))throw TypeError("Incorrect invocation");return+t}},"651e":function(t,e,a){"use strict";a("98c7")},6791:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{staticClass:"panel-group",attrs:{gutter:40}},[a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-people"},[a("svg-icon",{attrs:{"icon-class":"peoples","class-name":"card-panel-icon"}})],1),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v(" 交易日期 ")]),a("div",{staticClass:"card-panel-num"},[t._v(t._s(this.version_date))])])])]),a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-message"},[a("svg-icon",{attrs:{"icon-class":"message","class-name":"card-panel-icon"}})],1),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v(" 收盘价 ")]),a("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":this.close_price,duration:3200,decimals:2}})],1)])]),a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-money"},[a("svg-icon",{attrs:{"icon-class":"money","class-name":"card-panel-icon"}})],1),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v(" 涨幅 ")]),a("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":this.up_down,duration:3200,decimals:2}})],1)])]),a("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[a("div",{staticClass:"card-panel"},[a("div",{staticClass:"card-panel-icon-wrapper icon-shopping"},[a("svg-icon",{attrs:{"icon-class":"shopping","class-name":"card-panel-icon"}})],1),a("div",{staticClass:"card-panel-description"},[a("div",{staticClass:"card-panel-text"},[t._v(" 标记 ")]),a("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":this.mapping,duration:3200}})],1)])])],1),a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:24}},[a("el-card",{attrs:{shadow:"always"}},[a("div",{staticStyle:{width:"100%",height:"300px","margin-bottom":"40px"},attrs:{id:"line"}})])],1)],1),a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:24}},[a("el-card",{attrs:{shadow:"always"}},[a("div",{staticStyle:{width:"100%",height:"300px","margin-bottom":"40px"},attrs:{id:"bar"}})])],1)],1)],1)},n=[],r=(a("b680"),a("ec1b")),o=a.n(r),l=a("bc3a"),s=a.n(l),c=(a("313e"),a("817d"),{data:function(){return{card_data_list:[],version_date:"",close_price:0,up_down:0,mapping:0,line_version_date:[],line_current_mapping:[],line_history_avg_mapping:[],bar_year_number:[],bar_max_earning_rate:[],bat_average_earning_rate:[]}},created:function(){this.card_data()},mounted:function(){this.line_data(),this.bar_data()},components:{CountTo:o.a},methods:{handleSetLineChartData:function(t){this.$emit("handleSetLineChartData",t)},card_data:function(){var t=this;s()({url:"http://localhost:8110/admin/core/gold/chart_card",method:"get"}).then((function(e){t.card_data_list=e.data.data,t.version_date=t.card_data_list[0].versionDate,t.close_price=parseFloat(t.card_data_list[0].close),t.up_down=parseFloat(t.card_data_list[0].upOrDown),t.mapping=parseFloat(t.card_data_list[0].mapping)})).catch((function(e){t.$message.error("error")}))},line_data:function(){var t=this;s()({url:"http://localhost:8110/admin/core/gold/line_data",method:"get"}).then((function(e){t.line_data_list=e.data.data;for(var a=[],i=0;i<t.line_data_list.length;i+=1)a.push(t.line_data_list[i].monthNumber);t.line_version_date=a;for(var n=[],r=0;r<t.line_data_list.length;r++)n.push(t.line_data_list[r].currentSumMapping);t.line_current_mapping=n;for(var o=[],l=0;l<t.line_data_list.length;l++)o.push(t.line_data_list[l].historyAverageMapping);t.line_history_avg_mapping=o,console.log("version_date:"+a),console.log("current_mapping:"+n),console.log("historyAverageMapping:"+o);var s=t.$echarts.init(document.getElementById("line"),"macarons"),c={title:{text:"月净值",x:"left",y:"top"},tooltip:{backgroundColor:"rgba(0,0,0,0)",trigger:"item"},legend:{orient:"horizontal"},toolbox:{orient:"horizontal",x:"right",y:"top",color:["#1e90ff","#22bb22","#4b0082","#d2691e"]},xAxis:{data:t.line_version_date,axisLabel:{interval:0}},yAxis:{},series:[{name:"今年净值",type:"line",data:t.line_current_mapping},{name:"历史月平均净值",type:"line",data:t.line_history_avg_mapping}]};s.setOption(c)})).catch((function(e){t.$message.error("error")}))},bar_data:function(){var t=this;s()({url:"http://localhost:8110/admin/core/gold/charts/bar",method:"get"}).then((function(e){for(var a=e.data.data,i=0;i<a.length;i++)t.bar_year_number.push(a[i].yearNumber);for(var n=0;n<a.length;n+=1)t.bar_max_earning_rate.push(a[n].maxEarningRate.toFixed(4));for(var r=0;r<a.length;r+=1)t.bat_average_earning_rate.push(a[r].averageEarningRate.toFixed(4));var o=t.$echarts.init(document.getElementById("bar"),"macarons"),l={title:{text:"最大收益率",x:"left",y:"top"},tooltip:{backgroundColor:"rgba(0,0,0,0)",trigger:"item"},legend:{orient:"horizontal"},toolbox:{orient:"horizontal",x:"right",y:"top",color:["#1e90ff","#22bb22","#4b0082","#d2691e"]},xAxis:{data:t.bar_year_number,axisLabel:{interval:0}},yAxis:{},series:[{name:"最大收益率",type:"bar",data:t.bar_max_earning_rate},{name:"历史年平均最大收益率",type:"line",data:t.bat_average_earning_rate}]};o.setOption(l)})).catch((function(e){t.$message.error("error")}))}}}),d=c,u=(a("651e"),a("2877")),p=Object(u["a"])(d,i,n,!1,null,"6c4ae684",null);e["default"]=p.exports},"817d":function(t,e,a){var i,n,r;(function(o,l){n=[e,a("313e")],i=l,r="function"===typeof i?i.apply(e,n):i,void 0===r||(t.exports=r)})(0,(function(t,e){var a=function(t){"undefined"!==typeof console&&console&&console.error&&console.error(t)};if(e){var i=["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3","#e5cf0d","#97b552","#95706d","#dc69aa","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a","#6f5553","#c14089"],n={color:i,title:{textStyle:{fontWeight:"normal",color:"#008acd"}},visualMap:{itemWidth:15,color:["#5ab1ef","#e0ffff"]},toolbox:{iconStyle:{borderColor:i[0]}},tooltip:{borderWidth:0,backgroundColor:"rgba(50,50,50,0.5)",textStyle:{color:"#FFF"},axisPointer:{type:"line",lineStyle:{color:"#008acd"},crossStyle:{color:"#008acd"},shadowStyle:{color:"rgba(200,200,200,0.2)"}}},dataZoom:{dataBackgroundColor:"#efefff",fillerColor:"rgba(182,162,222,0.2)",handleColor:"#008acd"},grid:{borderColor:"#eee"},categoryAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitLine:{lineStyle:{color:["#eee"]}}},valueAxis:{axisLine:{lineStyle:{color:"#008acd"}},splitArea:{show:!0,areaStyle:{color:["rgba(250,250,250,0.1)","rgba(200,200,200,0.1)"]}},splitLine:{lineStyle:{color:["#eee"]}}},timeline:{lineStyle:{color:"#008acd"},controlStyle:{color:"#008acd",borderColor:"#008acd"},symbol:"emptyCircle",symbolSize:3},line:{smooth:!0,symbol:"emptyCircle",symbolSize:3},candlestick:{itemStyle:{color:"#d87a80",color0:"#2ec7c9"},lineStyle:{width:1,color:"#d87a80",color0:"#2ec7c9"},areaStyle:{color:"#2ec7c9",color0:"#b6a2de"}},scatter:{symbol:"circle",symbolSize:4},map:{itemStyle:{color:"#ddd"},areaStyle:{color:"#fe994e"},label:{color:"#d87a80"}},graph:{itemStyle:{color:"#d87a80"},linkStyle:{color:"#2ec7c9"}},gauge:{axisLine:{lineStyle:{color:[[.2,"#2ec7c9"],[.8,"#5ab1ef"],[1,"#d87a80"]],width:10}},axisTick:{splitNumber:10,length:15,lineStyle:{color:"auto"}},splitLine:{length:22,lineStyle:{color:"auto"}},pointer:{width:5}}};e.registerTheme("macarons",n)}else a("ECharts is not Loaded")}))},"98c7":function(t,e,a){},b680:function(t,e,a){"use strict";var i=a("23e7"),n=a("a691"),r=a("408a"),o=a("1148"),l=a("d039"),s=1..toFixed,c=Math.floor,d=function(t,e,a){return 0===e?a:e%2===1?d(t,e-1,a*t):d(t*t,e/2,a)},u=function(t){var e=0,a=t;while(a>=4096)e+=12,a/=4096;while(a>=2)e+=1,a/=2;return e},p=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!l((function(){s.call({})}));i({target:"Number",proto:!0,forced:p},{toFixed:function(t){var e,a,i,l,s=r(this),p=n(t),h=[0,0,0,0,0,0],m="",f="0",g=function(t,e){var a=-1,i=e;while(++a<6)i+=t*h[a],h[a]=i%1e7,i=c(i/1e7)},_=function(t){var e=6,a=0;while(--e>=0)a+=h[e],h[e]=c(a/t),a=a%t*1e7},v=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==h[t]){var a=String(h[t]);e=""===e?a:e+o.call("0",7-a.length)+a}return e};if(p<0||p>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(m="-",s=-s),s>1e-21)if(e=u(s*d(2,69,1))-69,a=e<0?s*d(2,-e,1):s/d(2,e,1),a*=4503599627370496,e=52-e,e>0){g(0,a),i=p;while(i>=7)g(1e7,0),i-=7;g(d(10,i,1),0),i=e-1;while(i>=23)_(1<<23),i-=23;_(1<<i),g(1,1),_(2),f=v()}else g(0,a),g(1<<-e,0),f=v()+o.call("0",p);return p>0?(l=f.length,f=m+(l<=p?"0."+o.call("0",p-l)+f:f.slice(0,l-p)+"."+f.slice(l-p))):f=m+f,f}})},ec1b:function(t,e,a){!function(e,a){t.exports=a()}(0,(function(){return function(t){function e(i){if(a[i])return a[i].exports;var n=a[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var a={};return e.m=t,e.c=a,e.i=function(t){return t},e.d=function(t,a,i){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,a){var i=a(4)(a(1),a(5),null,null);t.exports=i.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,a,i){return a*(1-Math.pow(2,-10*t/i))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,i.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,i.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,i.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,i.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,i.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals),t+="";var e=t.split("."),a=e[0],i=e.length>1?this.decimal+e[1]:"",n=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;n.test(a);)a=a.replace(n,"$1"+this.separator+"$2");return this.prefix+a+i+this.suffix}},destroyed:function(){(0,i.cancelAnimationFrame)(this.rAF)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(0),n=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=n.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",n.default)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=0,n="webkit moz ms o".split(" "),r=void 0,o=void 0;if("undefined"==typeof window)e.requestAnimationFrame=r=function(){},e.cancelAnimationFrame=o=function(){};else{e.requestAnimationFrame=r=window.requestAnimationFrame,e.cancelAnimationFrame=o=window.cancelAnimationFrame;for(var l=void 0,s=0;s<n.length&&(!r||!o);s++)l=n[s],e.requestAnimationFrame=r=r||window[l+"RequestAnimationFrame"],e.cancelAnimationFrame=o=o||window[l+"CancelAnimationFrame"]||window[l+"CancelRequestAnimationFrame"];r&&o||(e.requestAnimationFrame=r=function(t){var e=(new Date).getTime(),a=Math.max(0,16-(e-i)),n=window.setTimeout((function(){t(e+a)}),a);return i=e+a,n},e.cancelAnimationFrame=o=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=r,e.cancelAnimationFrame=o},function(t,e){t.exports=function(t,e,a,i){var n,r=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(n=t,r=t.default);var l="function"==typeof r?r.options:r;if(e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),a&&(l._scopeId=a),i){var s=Object.create(l.computed||null);Object.keys(i).forEach((function(t){var e=i[t];s[t]=function(){return e}})),l.computed=s}return{esModule:n,exports:r,options:l}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])}))}}]);