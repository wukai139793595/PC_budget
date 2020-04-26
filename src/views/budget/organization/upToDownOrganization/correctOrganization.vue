<template>
  <div class="correctOrganization">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">修改编制</div>
      </div>
      <div class="fr">
        <el-button size="small" plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div class="table-content">
      <div class="table-header">
        <p class="table-title"><span></span>{{$route.query.fileName}}</p>
        <div style="float: right">
          <el-button size="small" type="primary" @click="calculation">测算</el-button>
          <el-button size="small" type="primary" @click="save">修改</el-button>
        </div>
      </div>
    </div>
    <div class="tableBox" style="margin-top: 10px">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="tableTh28" border stripe height="69vh" ref="table">
        <el-table-column label="区域树" fixed prop="areaName" width="150" class-name="area fixedColumn" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span :class=" 'indent' + scope.row.areaLvl ">
              <i :class="scope.row.icon" @click="addOrMinus(scope.row,scope.$index)"></i>
              {{scope.row.areaName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="房间数（户）" prop="val1">
          <!--当年数据importability为true可以进行输入-->
          <template slot-scope="scope" >
            <!--此处v-if=true为复制过来数据  懒得修改 见谅 勿喷 实属无奈-->
            <el-input
              v-if="true"
              size="small"
              v-model="scope.row.val1"
              class="input"
              placeholder="必填"
            ></el-input>
            <span v-else>{{scope.row.val1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="人口数（户）" prop="val2">
          <template slot-scope="scope" >
            <el-input
              v-if="true"
              size="small"
              v-model="scope.row.val2"
              class="input"
              placeholder="必填"
            ></el-input>
            <span v-else>{{scope.row.val2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="企业数（户）" prop="val3">
          <template slot-scope="scope" >
            <el-input
              v-if="true"
              size="small"
              v-model="scope.row.val3"
              class="input"
              placeholder="必填"
            ></el-input>
            <span v-else>{{scope.row.val3}}</span>
          </template>
        </el-table-column>
        <el-table-column label="分项收入预算">
          <el-table-column label="组网专线">
            <el-table-column>
              <el-table-column label="组网专线用户到达数" prop="val4">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val4"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val4}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线净增（户）" prop="val15">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val5"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val5}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线渗透率（%）" prop="val6">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val6"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val6}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线ARPU" prop="val7" width="75">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val7"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val7}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="组网专线收入" prop="val8">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val8"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val8}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="宽带业务">
            <el-table-column label="普通宽带（含闪讯）">
              <el-table-column label="普通宽带用户到达数" prop="val9">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val9"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val9}}</span>
                </template>
              </el-table-column>
              <el-table-column label="普通宽带渗透率（%）" prop="val10">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val10"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val10}}</span>
                </template>
              </el-table-column>
              <el-table-column label="普通宽带新增（户）" prop="val11">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val11"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val11}}</span>
                </template>
              </el-table-column>
              <el-table-column label="普通宽带离网（户）" prop="val12">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val12"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val12}}</span>
                </template>
              </el-table-column>
              <el-table-column label="普通宽带净增（户）" prop="val13">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val13"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val13}}</span>
                </template>
              </el-table-column>
              <el-table-column label="普通宽带ARPU" prop="val14" width="75">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val14"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val14}}</span>
                </template>
              </el-table-column>
              <el-table-column label="普通宽带收入" prop="val15">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val15"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val15}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="互联网专线（含商务专线）">
              <el-table-column label="互联网专线到达数" prop="val16">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val16"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val16}}</span>
                </template>
              </el-table-column>
              <el-table-column label="互联网专线渗透率（%）" prop="val17">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val17"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val17}}</span>
                </template>
              </el-table-column>
              <el-table-column label="互联网专线新增（户）" prop="val18">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val18"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val18}}</span>
                </template>
              </el-table-column>
              <el-table-column label="互联网专线离网（户）" prop="val19">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val19"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val19}}</span>
                </template>
              </el-table-column>
              <el-table-column label="互联网专线净增（户）" prop="val20">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val20"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val20}}</span>
                </template>
              </el-table-column>
              <el-table-column label="互联网专线ARPU" prop="val21" width="75">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val21"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val21}}</span>
                </template>
              </el-table-column>
              <el-table-column label="互联网专线收入" prop="val22">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val22"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val22}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="移动业务（不含移动CIT">
            <el-table-column>
              <el-table-column label="移动用户到达数" prop="val23">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val23"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val23}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动用户渗透率（%）" prop="val24">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val24"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val24}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动新增（户）" prop="val25">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val25"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val25}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动离网（户）" prop="val26">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val26"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val26}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动净增（户）" prop="val27">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val27"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val27}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动ARPU" prop="val28">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val28"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val28}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="移动收入" prop="val29">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val29"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val29}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="其中：物联网收入" prop="val30">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val30"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val30}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="物联网收入增长率" prop="val31">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val31"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val31}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column lable="ITV业务">
            <el-table-column>
              <el-table-column label="ITV用户到达数（户）" prop="val32">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val32"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val32}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV用户渗透率" prop="val33">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val33"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val33}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV净增（户）" prop="val34">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val34"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val34}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV用户ARPU" prop="val35" width="75">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val35"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val35}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ITV收入" prop="val36">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val36"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val36}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="固话业务">
            <el-table-column>
              <el-table-column label="固话收入" prop="val37">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val37"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val37}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="固话收入变化" prop="val38">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val38"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val38}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="智能组网">
            <el-table-column>
              <el-table-column label="智能组网收入" prop="val39">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val39"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val39}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="智能组网收入变化" prop="val40">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val40"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val40}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="号百">
            <el-table-column>
              <el-table-column label="号百收入" prop="val41">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val41"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val41}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="号百收入变化" prop="val42">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val42"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val42}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="ICT">
            <el-table-column>
              <el-table-column label="ICT收入" prop="val43">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val43"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val44}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="ICT收入变化" prop="val44">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val44"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val44}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="IDC">
            <el-table-column>
              <el-table-column label="IDC收入" prop="val45">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val45"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val45}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="IDC收入变化" prop="val46">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val46"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val46}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="其他">
            <el-table-column>
              <el-table-column label="其他收入" prop="val47">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val47"
                    class="input"
                    placeholder="选填"
                  ></el-input>
                  <span v-else>{{scope.row.val47}}</span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column>
              <el-table-column label="其他收入变化" prop="val48">
                <template slot-scope="scope" >
                  <el-input
                    v-if="true"
                    size="small"
                    v-model="scope.row.val48"
                    class="input"
                    placeholder="必填"
                  ></el-input>
                  <span v-else>{{scope.row.val48}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="总收入" prop="val49">
          <template slot-scope="scope" >
            <el-input
              v-if="true"
              size="small"
              v-model="scope.row.val49"
              class="input"
              placeholder="选填"
            ></el-input>
            <span v-else>{{scope.row.val49}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { $budgetAPI } from '@/api'
  import {getSessionStorage} from "@/common/js/storage";
  import {mergeTableRow} from "@/utils/mixin";

  export default {
    name: "seeOrganization",
    data() {
      return {
        tableData: [],
        tableLoading: false,
        accountInfo:{}
      }
    },
    created() {
      this.showEditData();
    },
    methods: {
      //测算
      calculation(){
        let str = [];
        this.tableData.map((table,index)=>{
          let params = {
            "val1":  table.val1,
            "val10": table.val10,
            "val11": table.val11,
            "val14": table.val14,
            "val17": table.val17,
            "val18": table.val18,
            "val2":  table.val2,
            "val21": table.val21,
            "val24": table.val24,
            "val25": table.val25,
            "val28": table.val28,
            "val3":  table.val3,
            "val31": table.val31,
            "val33": table.val33,
            "val35": table.val35,
            "val38": table.val38,
            "val40": table.val40,
            "val42": table.val42,
            "val44": table.val44,
            "val46": table.val46,
            "val48": table.val48,
            "val6":  table.val6,
            "val7":  table.val7,
            "areaId": table.areaId,
            "year": table.year
            // "areaId":450,
            // "year": '2021_4'
          };
          str.push(params);
        });
        let obj = {str:JSON.stringify(str)};
        $budgetAPI.calculation(obj,res=>{
          this.alertError(res);
          if(res.code == 0){
            this.tableData = [];
            res.content.map((item,index)=>{
              if(item.areaLvl == 5){
                this.$set(item,'icon','')
              }
              if(item.areaLvl == areaLvl){
                this.$set(item,'icon','el-icon-minus')
              }
              if(item.areaLvl > areaLvl && item.areaLvl != 5){
                this.$set(item,'icon','el-icon-plus')
              }
              if(index == 0  && item.areaLvl != 5){
                this.$set(item,'icon','el-icon-minus')
              }
              this.tableData.push(item);
            });
          }
        },err=>{

        })
      },
      //修改
      save(){
        let str = [];
        this.tableData.map((table,index)=>{
          let params = {
            areaId: table.areaId,
            logId:  table.logId,
            detailId: table.detailId,
            parentId: table.parentId,
            year: table.year,
            val1:table.val1,
            val2:table.val2,
            val3:table.val3,
            val4:table.val4,
            val5:table.val5,
            val6:table.val6,
            val7:table.val7,
            val8:table.val8,
            val9:table.val9,
            val10:table.val10,
            val11:table.val11,
            val12:table.val12,
            val13:table.val13,
            val14:table.val14,
            val15:table.val15,
            val16:table.val16,
            val17:table.val17,
            val18:table.val18,
            val19:table.val19,
            val20:table.val20,
            val21:table.val21,
            val22:table.val22,
            val23:table.val23,
            val24:table.val24,
            val25:table.val25,
            val26:table.val26,
            val27:table.val27,
            val28:table.val28,
            val29:table.val29,
            val30:table.val30,
            val31:table.val31,
            val32:table.val32,
            val33:table.val33,
            val34:table.val34,
            val35:table.val35,
            val36:table.val36,
            val37:table.val37,
            val38:table.val38,
            val39:table.val39,
            val40:table.val40,
            val41:table.val41,
            val42:table.val42,
            val43:table.val43,
            val44:table.val44,
            val45:table.val45,
            val46:table.val46,
            val47:table.val47,
            val48:table.val48,
            val49:table.val49,
          };
          str.push(params);
        });
        let obj = {str:JSON.stringify(str)};
        $budgetAPI.updateEdit(obj,res=>{
          this.alertError(res);
          if(res.code == 0){
            this.$message({
              type:'success',
              message:'修改成功'
            });
            this.$router.go(-1);
          }
        },err=>{

        })
      },
      //增加或展开行
      addOrMinus(row,index){
        if(row.icon == 'el-icon-plus'){
          let params = {
            areaId: row.areaId,
            year: row.year,
          };
          this.getSubEditData(params,index);
          row.icon = 'el-icon-minus';
          return false
        }
        if(row.icon == 'el-icon-minus'){
          let i = 0;
          this.tableData.map((item,index)=>{
            if(item.parentId == row.areaId){
              i++;
            }
          });
          this.tableData.splice(index + 1,i);
          row.icon = 'el-icon-plus';
        }
      },
      showEditData(){
        this.tableLoading = true;
        this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
        let areaLvl = this.accountInfo.areaLvl;
        $budgetAPI.showEditData({
          detailId:this.$route.query.detailId,
          type:2
        },res=>{
          this.alertError(res);
          if (res.code == 0){
            res.content.map((item,index)=>{
              if(item.areaLvl == 5){
                this.$set(item,'icon','')
              }
              if(item.areaLvl == areaLvl){
                this.$set(item,'icon','el-icon-minus')
              }
              if(item.areaLvl > areaLvl && item.areaLvl != 5){
                this.$set(item,'icon','el-icon-plus')
              }
              if(index == 0  && item.areaLvl != 5){
                this.$set(item,'icon','el-icon-minus')
              }
              this.tableData.push(item);
            });
          }
          setTimeout(()=>{
            this.$refs.table.doLayout();
          },500);
          this.tableLoading = false
        },err=>{

        })
      },
      getSubEditData(params,rowIndex){
        // this.tableLoading = true;
        let areaLvl = this.accountInfo.areaLvl;
        $budgetAPI.getSubEditData(params,res=>{
          this.alertError(res);
            let i = 0;
            if(res.content.length > 0){
              res.content.map((item,index)=>{
                  if(item.areaLvl == 5){
                    this.$set(item,'icon',null)
                  }
                  if(item.areaLvl == areaLvl){
                    this.$set(item,'icon','el-icon-minus')
                  }
                  if(item.areaLvl > areaLvl && item.areaLvl != 5){
                    this.$set(item,'icon','el-icon-plus')
                  }
                  i++;
                  this.tableData.splice(rowIndex + i,0,item)
              });
              this.tableLoading = false;
            }else{
              // this.$message('当前层级下没有数据');
              // this.tableLoading = false
            }
        },err=>{

        })
      }
    }
  }
</script>

<style  lang="scss">
  .correctOrganization{
    .upload-demo{
      display: inline-block;
      margin: 0 15px;
    }
    .table-content{
      margin-top: 10px;
      .table-header{
        display: flex;
        justify-content: space-between;
        .table-title{
          font-size: 14px;
          font-weight: bold;
          height: 30px;
          line-height: 30px;
          span{
            display: inline-block;
            width: 5px;
            height: 5px;
            background-color: #418ee9;
            border-radius: 1000%;
            overflow: hidden;
            margin-right: 10px;
            margin-bottom: 3px;
          }
        }
      }
    }
    th.el-table_1_column_1.area{
      text-align: center!important;
    }
    .area{
      text-align: left !important;

      span.indent2{
        padding-left: 2px;
      }
      span.indent3{
        padding-left: 16px;
      }
      span.indent4{
        padding-left: 32px;
      }
      span.indent5{
        padding-left: 48px;
        i{
          border:0;
        }
      }
      i{
        cursor: pointer;
        margin-right: 2px;
        border:1px solid #3a85e1;
        padding: 1px;
        border-radius:2px;
        color: #3a85e1;
      }
    }
  }

</style>
