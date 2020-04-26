<template>
  <div style="height:100%;width:100%;">
    <div class="canvas" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "pie",
  props: {
    pieData: {},
  },
  watch:{
    pieData(val){
      this.getPie(val);
    },
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
      const that = this;
      var myChart = this.$echarts.init(document.querySelector(".canvas"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}万元 ({d}%)",
          confine:true
        },
        series: [
          {
            type: "pie",
            // selectedMode: "single",
            // radius: ['20%', '35%'],
            radius: ['36%', '55%'],
            labelLine:{
              length:1
            },
            label: {
              normal: {
                formatter: "{b|{b}}  \n{b|{d}% } ",
                rich: {
                    b: {
                        fontSize: 10,
                        color: "#666666"
                    },
                    d: {
                        fontSize: 10,
                        color: "#666",
                        fontWeight: 600
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
            // labelLine: {
            //   normal: {
            //     show: false
            //   }
            // },
            data: [
              { value: this.findData(val.data,"YS21004"), name: "实体渠道新增数", itemStyle: { color: "#49a9ee" } },
              { value: this.findData(val.data,"YS21005"), name: "政企渠道新增数", itemStyle: { color: "#6dc467" } },
              { value: this.findData(val.data,"YS21006"), name: "电子渠道新增数", itemStyle: { color: "#ebbd40" } },
            ]
          },
          // {
          //   name: "分产品构成",
          //   type: "pie",
          //   radius: ["40%", "55%"],
          //   label: {
          //     normal: {
          //       formatter: "{b|{b}}  \n{b|{d}% } ",
          //       rich: {
          //         b: {
          //           fontSize: 10
          //         }
          //       }
          //     },
          //     emphasis: {
          //       formatter: "{b|{b}}  \n{b|{d}% } ",
          //       rich: {
          //         b: {
          //           fontSize: 12,
          //           fontWeight: "bold"
          //         }
          //       }
          //     }
          //   },
          //   data: [
          //     { value: this.findData(val,"YS10051"), name: "IDC收入", itemStyle: { color: "#F09533" } },
          //     { value: this.findData(val,"YS10050"), name: "ICT收入", itemStyle: { color: "#FFD45F" } },
          //     { value: this.findData(val,"YS10045"), name: "固网其他", itemStyle: { color: "#1D8BDA" } },
          //     { value: this.findData(val,"YS10044"), name: "设施出租", itemStyle: { color: "#339BE6" } },
          //     {
          //       value: this.findData(val,"YS10043"),
          //       name: "组网专线",
          //       itemStyle: { color: "#49A9EE" }
          //     },
          //     { value: this.findData(val,"YS10039"), name: "固话收入", itemStyle: { color: "#2FA777" } },
          //     { value: this.findData(val,"YS10025"), name: "移动收入", itemStyle: { color: "#6DC467" } },
          //     { value: this.findData(val,"YS10033"), name: "宽带收入", itemStyle: { color: "#98D87D" } },
          //     { value: this.findData(val,"YS10036"), name: "天翼高清收入", itemStyle: { color: "#AEE796" } }
          //   ]
          // }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>
