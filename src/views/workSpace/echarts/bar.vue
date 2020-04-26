<template>
  <div style="height:100%;width:100%;">
    <div class="barCanvas" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "bar",
  props: {
    barData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch:{
    barData(val){
      this.getBar(val);
    }
  },
  mounted() {
  },
  methods: {
    getBar(val) {
      const that = this;
      var myChart = this.$echarts.init(document.querySelector(".barCanvas"));
      let option = {
        xAxis: {
          type: "category",
          data: val.xAxis,
          // axisLabel :{
          //   rotate:40
          // }

        },
        yAxis: {
          show: false,
          type: "value",
          max:(value) =>{
            return value.max * 1.5
          }
        },
        tooltip: {
          trigger: "item",
          formatter:"{b} {c}%",
        },
        grid:{
          left:0,
          right:0,
        },
        series: [
          {
            data: val.yAxis,
            label:{
              show:true,
              formatter:"{c}%",
              position:"top",
              color:"#666666",
              fontSize:10,
            },

            itemStyle:{
              color:(params)=>{
                if(params.name == val.areaName){
                  return "#FFD55F"
                }else{
                  return "#00b7ee"
                }
              }
            },
            barMaxWidth:20,
            type: "bar"
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
