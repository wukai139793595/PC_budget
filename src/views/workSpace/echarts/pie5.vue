<template>
  <div style="height:100%;width:100%;">
    <div class="pieCanvas1" style="height:100%;width:100%;"></div>
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
      this.getPie(val.fuseList, val.productList);
    }
  },
  mounted() {},
  methods: {
    findData(val, TCLEVEL) {
      let returnValue = val.find((value, index, arr) => {
        if (value.TCLEVEL == TCLEVEL) {
          return value;
        }
      });
      return returnValue.INCOMELJ;
    },
    findData2(val, TJTYPE) {
      let returnValue = val.find((value, index, arr) => {
        if (value.TJTYPE == TJTYPE) {
          return value;
        }
      });
      return returnValue.INCOMELJ;
    },
    getPie(fuseList, productList) {
      let fuseListData = 0;
      let productListData = 0;
      let data = [];
      fuseList.map((item, index) => {
        let obj = {
          name: "",
          value: ""
        };
        obj.name = item.TJTYPE + item.TCLEVEL;
        obj.value = item.INCOMELJ;
        data.push(obj);
        fuseListData += Number(item.INCOMELJ);
      });
      productList.map((item, index) => {
        let obj = {
          name: "",
          value: ""
        };
        obj.name = item.TJTYPE;
        obj.value = item.INCOMELJ;
        data.push(obj);
        productListData += Number(item.INCOMELJ);
      });
      const that = this;
      var myChart = this.$echarts.init(document.querySelector(".pieCanvas1"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}万元 ({d}%)"
        },
        color: [
          "#4ecfdb",
          "#49a9ee",
          "#3499e2",
          "#288fd9",
          "#2fa777",
          "#6dc467",
          // "#83cc64",
          "#98d87d",
          "#ffd86e",
          "#ebbd40",
          "#f3978f",
          "#f3857b"
        ],
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            center: ["48%", "50%"],
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
              lineStyle: {
                color: "#c9c9c9"
              }
            },
            data: [
              {
                value: fuseListData,
                name: "融合",
                itemStyle: { color: "#49a9ee" }
              },
              {
                value: productListData,
                name: "单产品",
                itemStyle: { color: "#ebbd40" }
              }
            ]
          },
          {
            name: "分套餐构成",
            type: "pie",
            radius: ["40%", "55%"],
            center: ["48%", "50%"],
            label: {
              normal: {
                formatter: "{b|{b}}  \n{d|{d}% } ",
                rich: {
                  b: {
                    fontSize: 10,
                    color: "#666"
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
            data: data
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