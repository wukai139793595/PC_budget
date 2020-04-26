<template>
  <div style="height:100%;width:100%;">
    <div class="radarCanvas" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "radar",
  props: {
    radarData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch:{
    radarData(val){
      this.getRadar(val);
    }
  },
  mounted() {

  },
  methods: {
    getRadar(val) {
      const that = this;
      var myChart = this.$echarts.init(document.querySelector(".radarCanvas"));
      let option = {
        legend: {
          show: true,
          top: "bottom",
          itemGap: 20,
          textStyle: {
            color: "#666666",
            fontSize: 12
          },
          data: [
            {
              name: "权重",
              // icon: "image:///PC_budgetCMS/static/image/rect1.png",
              icon: "image:///static/image/rect1.png"
            },
            {
              name: val.parentName,
              // icon: "image:///PC_budgetCMS/static/image/rect1.png",
              icon: "image:///static/image/rect2.png"
            },
            {
              name: val.currentName? val.currentName :null,
              // icon: "image:///PC_budgetCMS/static/image/rect1.png",
              icon: val.currentName?"image:///static/image/rect3.png":null,
            }
          ]
        },
        tooltip: {
          trigger: "item"
        },
        radar: {
          name: {
            textStyle: {
              color: "#666666"
            }
          },
          splitNumber: 4,
          splitArea: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: ["#C5E0FF"]
            }
          },
          axisLine: {
            //指向外圈文本的分隔线样式
            lineStyle: {
              color: "#dbecff"
            }
          },
          indicator: [
            { name: "收入完成", max: 30 },
            { name: "主量发展", max: 30 },
            { name: "发展方式", max: 30 },
            { name: "客户经营", max: 30 },
            { name: "用户质态", max: 30 },
          ]
        },
        series: [
          {
            type: "radar",
            symbol: "none",
            lineStyle: {
              normal: {
                width: 0.8
              }
            },

            data: [
              {
                value: [20,20,20,20,20],
                name: "权重",
                lineStyle: {
                  normal: {
                    color: "#f39700",
                    type: "dashed"
                  }
                }
              },
              {
                value: val.parentData,
                lineStyle: {
                  color: "#9b90ff"
                },
                name: val.parentName,
              },
              {
                value: val.currentData?val.currentData:null,
                lineStyle: {
                  color: "#95bff3"
                },
                areaStyle: {
                  normal: {
                    type: "default",
                    color: "#95bff3"
                  }
                },
                name: val.currentName?val.currentName:null,
              }
            ]
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
