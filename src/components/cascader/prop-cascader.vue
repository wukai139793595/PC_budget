<template>
  <el-cascader
    ref="cascader"
    :props="props"
    expandTrigger="hover"
    :show-all-levels="false"
    clearable
    @change="changeHandle($event)"
    v-model="area"
  />
</template>

<script>
import { getSessionStorage } from "@/common/js/storage";
import { $budgetAPI } from "@/api";


export default {
  name: "dx-cascader",
  props: ["area_id", "area_name", "area_lvl"],
  data() {
    var that = this;
    let accountInfo = JSON.parse(getSessionStorage("accountInfo"));
    return {
      area:that.area_id,
      id: "",
      lvl: "",
      props: {
        lazy: true,
        checkStrictly: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          var areaId;
          var lvl;
          var areaName;
          if (level == 0) {
            areaId = that.area_id;
            areaName = that.area_name;
            lvl = that.area_lvl;
            resolve([{ value: areaId, label: areaName, lvl: lvl }]);
          } else {
            areaId = node.value;
            lvl = node.data.lvl;
            $budgetAPI.getCompanyByLvl(
              {
                areaId,
                lvl: lvl
              },
              res => {
                if (res.code == 0) {
                  let nodes = res.content.map((item, index) => {
                    return {
                      value: item.areaId,
                      label: item.areaName,
                      lvl: item.areaLvl !== lvl ? item.areaLvl : ""
                    };
                  });
                  resolve(nodes);
                } else {
                  this.alertError(res);
                }
              }
            );
          }
        }
      }
    };
  },
  created () {
    this.area = this.area_id
  },
  methods: {
    clear() {
      let obj = {};
      obj.stopPropagation = () => {};
      try {
        this.$refs.cascader.clearValue(obj);
      } catch (err) {
        this.$refs.cascader.handleClear(obj);
      }
    },
    changeHandle(event) {
      if (event) {
        let arr = event.slice(0);
        let value = arr.pop();
        this.$emit("update:area_id", value);
        // 触发父组件的change函数
        this.$emit("change", value);
        let data = this.$refs.cascader.getCheckedNodes()[0]
          ? this.$refs.cascader.getCheckedNodes()[0].data
          : "";
        if (data) {
          this.$emit("update:area_name", data.label);
          this.$emit("update:area_lvl", data.lvl);
        }
        this.$refs.cascader.dropDownVisible = false;
      }
    }
  }
};
</script>

<style lang="scss">
</style>