<template>
  <div style="height:100%;width:100%;">
    <div class="pieCanvasSplit" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "pie",
  props: {
    pieData: {}
  },
  watch:{
    pieData(val){
      this.getPie(val);
    }
  },
  mounted() {
  },
  methods: {
    findData(val,indexCode){
      let returnValue = val.find((value,index,arr)=>{
        if(value.indexCode == indexCode){
          return value
        }
      })
      return returnValue.indexValue
    },
    getPie(val) {
      let val1 = val["1"] + val["2"] + val["3"] + val["4"] + val["5"] + val["5.1"];
      let val2 = val["6"] + val["7"];
      const that = this;
      var myChart = this.$echarts.init(document.querySelector(".pieCanvasSplit"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}万元 ({d}%)",
          confine:true
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              normal: {
                position: "inner",
                formatter: "{b|{b}}  \n{b|{d}% } ",
                rich: {
                  b: {
                    fontSize: 10,
                    color:"#fff"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: val2, name: "ICT/IDC", itemStyle: { color: "#F09533" } },
              { value: val1, name: "基本面", itemStyle: { color: "#49A9EE" } }
            ]
          },
          {
            name: "分产品构成",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{b|{b}}  \n{b|{d}% } ",
                rich: {
                  b: {
                    fontSize: 10
                  }
                }
              },
              emphasis: {
                formatter: "{b|{b}}  \n{b|{d}% } ",
                rich: {
                  b: {
                    fontSize: 12,
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: [
              { value: val["7"], name: "IDC", itemStyle: { color: "#F09533" } },
              { value: val["6"], name: "ICT", itemStyle: { color: "#FFD45F" } },
              { value: val["1"], name: "移动", itemStyle: { color: "#6DC467" } },
              { value: val["2"], name: "宽带", itemStyle: { color: "#98D87D" } },
              { value: val["3"], name: "ITV", itemStyle: { color: "#AEE796" } },
              { value: val["4"], name: "固话", itemStyle: { color: "#1D8BDA" } },
              { value: val["5"], name: "其他", itemStyle: { color: "#49A9EE" } },
              { value: val["5.1"], name: "大单", itemStyle: { color: "#339BE6" } },
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