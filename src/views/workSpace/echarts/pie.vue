<template>
  <div style="height:100%;width:100%;">
    <div class="pieCanvas" style="height:100%;width:100%;"></div>
  </div>
</template>

<script>
export default {
  name: "pie",
  props: {
    pieData: {}
  },
  watch: {
    pieData(val) {
      this.getPie(val);
    }
  },
  mounted() {},
  methods: {
    findData(val, indexCode) {
      let returnValue = val.find((value, index, arr) => {
        if (value.indexCode == indexCode) {
          return value;
        }
      });
      return returnValue.indexValue;
    },
    getPie(val) {
      const that = this;
      var myChart = this.$echarts.init(document.querySelector(".pieCanvas"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}万元 ({d}%)",
          confine: true
        },
        // color:[
        //   "#24B1FA",
        //   "#24A7FA",

        //   "#4DD9E5",
        //   "#0FD9EB",
        //   "#17CEDE",
        //   "#1CC7D6",
        //   "#16BCCA",
        //   "#19B3C0",
        //   "#1BAAB6",
        // ],
        color: [
          "#ffd45f",
          "#f3857b",
          "#4ecfdb",
          "#49a9ee",
          "#3499e2",
          "#2fa777",
          "#6dc467",
          "#83cc64",
          "#98d87d"
        ],
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
                    color: "#fff"
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
              // { value: this.findData(val,"YS10049"), name: "ICT/IDC", itemStyle: { color: "#24A7FA" } },
              // { value: this.findData(val,"YS10023"), name: "基本面", itemStyle: { color: "#1CC7D6" } }
              {
                value: this.findData(val, "YS10049"),
                name: "ICT/IDC",
                itemStyle: { color: "#f3857b" }
              },
              {
                value: this.findData(val, "YS10023"),
                name: "基本面",
                itemStyle: { color: "#49a9ee" }
              }
            ]
          },
          {
            name: "分产品构成",
            type: "pie",
            symbol:'circle',
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{b|{b}}\n{d|{d}% } ",
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
            labelLine: {
              lineStyle: {
                color: "#c9c9c9"
              }
            },
            data: [
              { value: this.findData(val, "YS10051"), name: "IDC收入" },
              { value: this.findData(val, "YS10050"), name: "ICT收入" },
              { value: this.findData(val, "YS10045"), name: "固网其他" },
              { value: this.findData(val, "YS10044"), name: "设施出租" },
              {
                value: this.findData(val, "YS10043"),
                name: "组网专线"
              },
              { value: this.findData(val, "YS10039"), name: "固话收入" },
              { value: this.findData(val, "YS10025"), name: "移动收入" },
              { value: this.findData(val, "YS10033"), name: "宽带收入" },
              { value: this.findData(val, "YS10036"), name: "天翼高清收入" }
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
