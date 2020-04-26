<template>
  <div style="height:100%;width:100%;">
    <div class="yugu" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "lineComponent",
  props: {
    lineObj: {
    },
    xAxis:{}
  },
  watch:{
    lineObj(val){
      this.getLine(val)
      // immediate:true,
      // handler(val){
      //   if(val.className != "lineCanvas"){
      //     setTimeout(()=>{
      //       this.getLine(val)
      //     },300)
      //   }
      // }
    },
  },
  mounted() {},
  methods: {
    getLine(val) {
      let data = val[0].slice(1,val[0].length);
      let data1 = val[1].slice(1,val[1].length);
      let maxData = Math.max.apply(null, data)
      let minData = Math.min.apply(null, data1)
      let maxData1 = Math.max.apply(null, data1)
        // console.log((minData-(minData+maxData1)%2)*2.2);
      let xAxis =  this.xAxis.slice(1,this.xAxis.length);
      const that = this;
      var myChart = this.$echarts.init(
        document.querySelector(".yugu")
      );
      let option = {

        xAxis: {
          type: "category",
          boundaryGap: true,
          data:xAxis,
          // axisLabel :{
          //   rotate:180
          // },
          // axisLine: {
          //   show: false
          // }
        },
        tooltip: {
          trigger: "axis",
            // function(a,b){
            //     return "{a}  {b}万元";
            // },
          // formatter: "{b}  {c}万元 ",
          axisPointer: {
            type: "shadow",

          },
            formatter:function(params){
                var res = params[0].name + '<br/>';
                params.forEach(item =>{
                    if(item.seriesType == 'line'){
                        res +=item.marker + item.seriesName + ": " + item.data + '%'
                    }else if(item.seriesType == 'bar'){
                        res +=item.marker + item.seriesName + ": " + item.data + '<br/>'
                    }
                })
                return res;
            }
        },
          // color:['#3a85e1','#ebbd40'],
        legend: {
              data: [{name:'本月预估数（万元）'}, {name:'环比'}],

        },
        grid: {
          left: "30px",
          right: "30px",
          bottom:'32px'
        },
        // yAxis: {
        //   show: false
        // },
          yAxis: [

              {
                  type: 'value',
                  min: 0,
                  splitLine:{show: false},  //去除网格线
                  max: maxData*2,
                  // interval: 50,
                  axisLabel: {
                      formatter: '{value} 万元',
                      show:false
                  },
                  axisTick:{ //y轴刻度线
                      show:false
                  },
                  axisLine:{ //y轴
                      show:false
                  },
              },
              {
                  type: 'value',
                  min: (minData-(minData+maxData1)%2)*2.2,
                  // max: 100,
                  // interval: 50,
                  splitLine:{show: false},  //去除网格线
                  axisLabel: {
                      formatter: '{value} %',
                      show:false
                  },
                  splitArea:{
                      show:true,
                      areaStyle:{
                          color:'#f5f5f5'
                      },
                  },
                  axisTick:{ //y轴刻度线
                      show:false
                  },
                  axisLine:{ //y轴
                      show:false
                  },
              }
          ],
        series: [
           {
            name: '本月预估数（万元）',
            type: 'bar',
            barWidth :50,
            lineStyle: {
                   normal: {
                       color: "#3a85e1", // 线条颜色
                       width: 0.8
                   }
               },
             itemStyle: {
                 normal:{
                     color: "#3a85e1",
                     borderColor: "#3a85e1",
                     label:{
                         show:true,
                         position:'top',
                         textStyle:{
                             fontSize:12,
                             color:'#000000',
                         },

                     }
                 }




             },
            data: data
           },
          {
            name: '环比',
            type: "line",
            smooth: false, //是否平滑曲线显示
            yAxisIndex: 1,
            // symbol: "none",
            lineStyle: {
              normal: {
                color: "#ebbd40", // 线条颜色
                width: 0.8
              }
            },
            itemStyle: {
              normal:{
                  color: "#ebbd40",
                  borderColor: "#ebbd40",
                  borderWidth: 3,
                  label:{
                      show:true,
                      position:'top',
                      textStyle:{
                          fontSize:12,
                          color:'#000000',
                      },
                      formatter: "{c}%"

                  }
              }
            },
            data: data1,
            //   data:[122.96,
            //   -1.98,
            //   13.09,
            //   -14.49,
            //   11.99,
            //   -2.24,
            //   0.54,
            //   14.47,
            //   18.28,
            //   -3.35,
            //   -42.97
            //   ]
            // areaStyle: {
            //   normal: {
            //     color: {
            //       type: "linear",
            //       x: 0,
            //       y: 0,
            //       x2: 0,
            //       y2: 1,
            //       colorStops: [
            //         {
            //           offset: 0,
            //           color: "#a0c5ff" // 0% 处的颜色
            //         },
            //         {
            //           offset: 0.5,
            //           color: "#a5cbff" // 0% 处的颜色
            //         },
            //
            //         {
            //           offset: 1,
            //           color: "#fff" // 100% 处的颜色
            //         }
            //       ],
            //       global: false // 缺省为 false
            //     }
            //   }
            // },
          },

        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>
