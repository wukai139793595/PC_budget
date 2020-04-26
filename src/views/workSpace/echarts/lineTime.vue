<template>
  <div style="height:100%;width:100%;">
    <div class="lineTime" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "lineComponent",
  props: {
    lineData: {
      type: Object,
      default: () => {
        return {
          className: "lineTime"
        };
      }
    },
    months: {}
  },
  watch: {
    lineData: {
      immediate: true,
      handler(val) {
        if (val.className != "lineTime") {
          setTimeout(() => {
            this.getLine(val);
          }, 300);
        }
      }
    }
  },
  mounted() {},
  methods: {
    getLine(val) {
      let data1 = []; //绝对完成数
      let data2 = []; //环比增长率
      let data3 = []; //本年累计
      let data4 = []; //年累计完成率
      val.detailList.map((item, index) => {
        data1.push(item.thisMonthValue);
        data2.push(item.hbRate);
        data3.push(item.thisYearLj);
        data4.push(item.completeLjRate);
      });
      const that = this;
      var myChart = this.$echarts.init(document.querySelector(".lineTime"));
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: that.months,

          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: params => {
            let obj = params[0];
            let a =
              obj.axisValue +
              "<br/>当月完成：" +
              data1[obj.dataIndex] +
              "万<br/>环比增长率：" +
              data2[obj.dataIndex] +
              "%<br/>本年累计：" +
              data3[obj.dataIndex] +
              "万<br/>年累计完成率：" +
              data4[obj.dataIndex] +
              "%";
            return a;
          },
          axisPointer: {
            type: "shadow"
            // shadowStyle: {
            //   color: "rgba(255,255,255,0.3)",
            //   shadowBlur: {
            //     shadowColor: {
            //       type: "linear",
            //       x: 0,
            //       y: 0,
            //       x2: 0,
            //       y2: 1,
            //       colorStops: [
            //         {
            //           offset: 0,
            //           color: "#CDD3D8" // 0% 处的颜色
            //         },
            //         {
            //           offset: 1,
            //           color: "#fff" // 100% 处的颜色
            //         }
            //       ],
            //       global: false // 缺省为 false
            //     }
            //   },
            //   shadowOffsetX: -5
            // }
          }
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            showDataShadow: false,
            showDetail: false,

            fillerColor: "#6DAFEC",
            backgroundColor: "#B8CAD5",
            height: 5,
            handleSize: "25",
            handleStyle: {
              color: "#0087FF"
            }
          },
          {
            type: "inside",
            realtime: true
          }
        ],
        grid: {
          left: "20px",
          right: "15px"
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: "当月完成",
            type: "line",
            smooth: true, //是否平滑曲线显示
            symbol: "none",
            itemStyle: {
              color: "rgba(255,255,255,0)" // 线条颜色
            },
            lineStyle: {
              normal: {
                color: "#4186f3", // 线条颜色
                width: 0.8
              }
            },
            // itemStyle: {
            //   color: "red",
            //   borderColor: "#fff",
            //   borderWidth: 3
            // },

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
            data: data1
          }
          // {
          //   name: "环比增长率",
          //   type: "bar",
          //   // smooth: true, //是否平滑曲线显示
          //   symbol: "none",
          //   itemStyle: {
          //       color: "rgba(255,255,255,0)", // 线条颜色
          //   },
          //   data: data2
          // },
          // {
          //   name: "本年累计",
          //   type: "bar",
          //   // smooth: true, //是否平滑曲线显示
          //   symbol: "none",
          //   itemStyle: {
          //       color: "rgba(255,255,255,0)", // 线条颜色
          //   },
          //   data: data3
          // },
          // {
          //   name: "年累计完成率",
          //   type: "bar",
          //   // smooth: true, //是否平滑曲线显示
          //   symbol: "none",
          //   itemStyle: {
          //       color: "rgba(255,255,255,0)", // 线条颜色
          //   },
          //   data: data4
          // },
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>