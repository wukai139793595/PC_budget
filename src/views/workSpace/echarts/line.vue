<template>
  <div style="height:100%;width:100%;">
    <div :class="lineObj.className" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "lineComponent",
  props: {
    lineObj: {
      type: Object,
      default: () => {
        return {
          className: "lineCanvas"
        };
      }
    },
    months:{

    }
  },
  watch:{
    lineObj:{
      immediate:true,
      handler(val){
        if(val.className != "lineCanvas"){
          setTimeout(()=>{
            this.getLine(val)
          },300)
        }
      }
    },
  },
  mounted() {},
  methods: {
    getLine(val) {
      let data = [];
      val.detailList.map((item,index)=>{
        data.push(item.thisMonthValue)
      })
      const that = this;
      var myChart = this.$echarts.init(
        document.querySelector("." + val.className)
      );
      let option = {
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data:that.months.filter((a,i)=>i<=4),

          axisLine: {
            show: false
          }
        },
        grid: {
          left: 0,
          right: 0
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: "line",
            smooth: true, //是否平滑曲线显示
            symbol: "none",
            lineStyle: {
              normal: {
                color: "#4186f3", // 线条颜色
                width: 0.8
              }
            },
            itemStyle: {
              color: "red",
              borderColor: "#fff",
              borderWidth: 3
            },

            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#a0c5ff" // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: "#a5cbff" // 0% 处的颜色
                    },

                    {
                      offset: 1,
                      color: "#fff" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            // data: data
              data: data.filter((a,i)=>i<=4)
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>
