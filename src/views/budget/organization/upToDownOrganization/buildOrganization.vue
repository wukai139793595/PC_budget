<template>
  <div class="buildOrganization">
    <div class="contentTopTitle">
      <div class="fl">
        <div class="title">新建编制</div>
      </div>
      <div class="fr">
        <el-button size="small"   plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <div  class="clearfix">
      <div style="float: right">
        <el-button size="small" type="primary" @click="calculation">测算</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
        <el-upload
          class="upload-demo"
          :action="importUrl"
          :limit="3"
          :on-success="importTarget"
          :show-file-list="false">
          <el-button size="small" type="orange">导入</el-button>
        </el-upload>
        <el-button size="small" plain @click="exportModal">模版下载</el-button>
      </div>
    </div>
    <div style="margin-top: 10px" class="tableBox">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%" class="tableTh28"
                border stripe height="69vh" :span-method="arraySpanMethod" ref="table">
        <el-table-column label="区域树" fixed prop="areaName" width="150" class-name="fixedColumn"></el-table-column>
        <el-table-column label="项目" fixed prop="year" width="130" class-name="fixedColumn"></el-table-column>
        <el-table-column label="房间数（户）" prop="val1">
          <!--当年数据importability为true可以进行输入-->
          <template slot-scope="scope" >
            <el-input
              v-if="scope.row.importability"
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
              v-if="scope.row.importability"
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
              v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
                    v-if="scope.row.importability"
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
              v-if="scope.row.importability"
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
  import { $budgetAPI } from '@/api';
  import {getSessionStorage} from "@/common/js/storage";
  import {mergeTableRow} from "@/utils/mixin";
  import prefixAPI from "@/api/prefixAPI";
  import {getCookie} from "@/common/js/cookie";
  export default {
    name: "buildOrganization",
    data(){
      return{
        tableLoading:false,
        tableData:[],
        accountInfo:"",
        areaName:"",
        historyData:[
          {
            "importability":false,
            "logId": "",
            "year":  "",
            "areaId": "",
            "areaName": "",
            "val1": null,
            "val2": null,
            "val3": null,
            "val4": null,
            "val5": null,
            "val6": null,
            "val7": null,
            "val8": null,
            "val9": null,
            "val10": null,
            "val11": null,
            "val12": null,
            "val13": null,
            "val14": null,
            "val15": null,
            "val16": null,
            "val17": null,
            "val18": null,
            "val19": null,
            "val20": null,
            "val21": null,
            "val22": null,
            "val23": null,
            "val24": null,
            "val25": null,
            "val26": null,
            "val27": null,
            "val28": null,
            "val29": null,
            "val30": null,
            "val31": null,
            "val32": null,
            "val33": null,
            "val34": null,
            "val35": null,
            "val36": null,
            "val37": null,
            "val38": null,
            "val39": null,
            "val40": null,
            "val41": null,
            "val42": null,
            "val43": null,
            "val44": null,
            "val45": null,
            "val46": null,
            "val47": null,
            "val48": null,
            "val49": null
          },
          {
            "importability":false,
            "logId": "",
            "year":  "",
            "areaId": "",
            "areaName": "",
            "val1": null,
            "val2": null,
            "val3": null,
            "val4": null,
            "val5": null,
            "val6": null,
            "val7": null,
            "val8": null,
            "val9": null,
            "val10": null,
            "val11": null,
            "val12": null,
            "val13": null,
            "val14": null,
            "val15": null,
            "val16": null,
            "val17": null,
            "val18": null,
            "val19": null,
            "val20": null,
            "val21": null,
            "val22": null,
            "val23": null,
            "val24": null,
            "val25": null,
            "val26": null,
            "val27": null,
            "val28": null,
            "val29": null,
            "val30": null,
            "val31": null,
            "val32": null,
            "val33": null,
            "val34": null,
            "val35": null,
            "val36": null,
            "val37": null,
            "val38": null,
            "val39": null,
            "val40": null,
            "val41": null,
            "val42": null,
            "val43": null,
            "val44": null,
            "val45": null,
            "val46": null,
            "val47": null,
            "val48": null,
            "val49": null
          },
          {
            "importability":false,
            "logId": "",
            "year":  "",
            "areaId": "",
            "areaName": "",
            "val1": null,
            "val2": null,
            "val3": null,
            "val4": null,
            "val5": null,
            "val6": null,
            "val7": null,
            "val8": null,
            "val9": null,
            "val10": null,
            "val11": null,
            "val12": null,
            "val13": null,
            "val14": null,
            "val15": null,
            "val16": null,
            "val17": null,
            "val18": null,
            "val19": null,
            "val20": null,
            "val21": null,
            "val22": null,
            "val23": null,
            "val24": null,
            "val25": null,
            "val26": null,
            "val27": null,
            "val28": null,
            "val29": null,
            "val30": null,
            "val31": null,
            "val32": null,
            "val33": null,
            "val34": null,
            "val35": null,
            "val36": null,
            "val37": null,
            "val38": null,
            "val39": null,
            "val40": null,
            "val41": null,
            "val42": null,
            "val43": null,
            "val44": null,
            "val45": null,
            "val46": null,
            "val47": null,
            "val48": null,
            "val49": null
          },
          {
            "importability":true,
            "logId": "",
            "year":  "",
            "areaId": "",
            "areaName": "",
            "val1": null,
            "val2": null,
            "val3": null,
            "val4": null,
            "val5": null,
            "val6": null,
            "val7": null,
            "val8": null,
            "val9": null,
            "val10": null,
            "val11": null,
            "val12": null,
            "val13": null,
            "val14": null,
            "val15": null,
            "val16": null,
            "val17": null,
            "val18": null,
            "val19": null,
            "val20": null,
            "val21": null,
            "val22": null,
            "val23": null,
            "val24": null,
            "val25": null,
            "val26": null,
            "val27": null,
            "val28": null,
            "val29": null,
            "val30": null,
            "val31": null,
            "val32": null,
            "val33": null,
            "val34": null,
            "val35": null,
            "val36": null,
            "val37": null,
            "val38": null,
            "val39": null,
            "val40": null,
            "val41": null,
            "val42": null,
            "val43": null,
            "val44": null,
            "val45": null,
            "val46": null,
            "val47": null,
            "val48": null,
            "val49": null
          }
        ],
        currentYear:{
          "importability":true,
          "logId": "",
          "year":  "",
          "areaId": "",
          "areaName": "",
          "val1": null,
          "val2": null,
          "val3": null,
          "val4": null,
          "val5": null,
          "val6": null,
          "val7": null,
          "val8": null,
          "val9": null,
          "val10": null,
          "val11": null,
          "val12": null,
          "val13": null,
          "val14": null,
          "val15": null,
          "val16": null,
          "val17": null,
          "val18": null,
          "val19": null,
          "val20": null,
          "val21": null,
          "val22": null,
          "val23": null,
          "val24": null,
          "val25": null,
          "val26": null,
          "val27": null,
          "val28": null,
          "val29": null,
          "val30": null,
          "val31": null,
          "val32": null,
          "val33": null,
          "val34": null,
          "val35": null,
          "val36": null,
          "val37": null,
          "val38": null,
          "val39": null,
          "val40": null,
          "val41": null,
          "val42": null,
          "val43": null,
          "val44": null,
          "val45": null,
          "val46": null,
          "val47": null,
          "val48": null,
          "val49": null
        },
        importUrl:"/api/bottomUpEdit/importEditFile"
      }
    },
    created() {
      this.importUrl = this.importUrl + "?token=" + getCookie('token') +  "&areaId=" + this.$route.query.areaId + "&year=" + this.$route.query.year;
      this.getCompanyByLvl();
      setTimeout(()=>{
        this.showEditInfo();
      },500);
    },
    methods:{
      //保存
      save(){
        let table = this.tableData[this.tableData.length - 1];
        let params = {
          areaId: this.$route.query.areaId,
          year: this.$route.query.year,
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
        $budgetAPI.checkAndSaveEdit(params,res=>{
          this.alertError(res);
          if(res.code == 0){
            this.$message({
              type:'success',
              message:'保存成功'
            });
            this.$router.go(-1);
          }
        },err=>{

        })
      },
      //指引指标数据导入
      importTarget(response,file,fileList){
        this.alertError(response);
        if(response.code == 0){
          this.$message({
            type:'success',
            message:'保存成功'
          });
          this.$router.go(-1);
        }
      },
      //测算接口
      calculation(){
        let table = this.tableData[this.tableData.length - 1];
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
          "areaId": this.$route.query.areaId,
          "year": this.$route.query.year
          // "areaId":450,
          // "year": '2021_4'
        };
        let str = [];
        str.push(params);
        let obj = {
          str:JSON.stringify(str)
        };
        $budgetAPI.calculation(obj,res=>{
          this.alertError(res);
          if(res.code == 0){
            let obj = res.content[0];
            this.$set(obj,'areaName',this.areaName);
            this.$set(obj,'year',table.year);
            this.$set(obj,'importability',true);
            this.tableData.splice(this.tableData.length - 1,1,obj);
            this.tableData = mergeTableRow(this.tableData,['areaName'])
          }
        },err=>{

        })
      },
      //模板下载
      exportModal(){
        // 根据不同模式切换不同的路径
        if (process.env.NODE_ENV == 'development') {
          window.location.href = prefixAPI.loc + "/api/bottomUpEdit/templateDownload?areaId=" + this.$route.query.areaId + '&year=' + this.$route.query.year;
        } else if (process.env.NODE_ENV == 'production') {
          window.location.href = prefixAPI.hp + "/api/bottomUpEdit/templateDownload?areaId=" + this.$route.query.areaId + '&year=' + this.$route.query.year;
        }
      },
      //table合并行
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        const span = column['property'] + '-span';
        if (row[span]) {
          return row[span]
        }
      },
      //根据层级获取区域树
      getCompanyByLvl(){
        this.accountInfo = JSON.parse(getSessionStorage('accountInfo'));
        $budgetAPI.getCompanyByLvl({
          lvl:this.accountInfo.areaLvl,
          areaId:this.accountInfo.areaId
        },res =>{
          this.alertError(res);
          res.content.map((item,index)=>{
            if(item.areaId == this.$route.query.areaId){
              this.areaName = item.areaName;
            }
          });
        },err =>{

        })
      },
      showEditInfo(){
        this.tableLoading = true;
        $budgetAPI.showEditInfo({
          areaId:this.$route.query.areaId,
          year:this.$route.query.year,
        }, res=>{
          this.tableLoading = false;
          this.alertError(res);
          if(res.code == 0){
            //判断historyData是否为空
            if(res.content.historyData && res.content.historyData.length >0){
              this.tableData = res.content.historyData;
              this.currentYear.year = res.content.rowInfo[res.content.rowInfo.length - 1];
              this.currentYear.areaName = this.areaName;
              this.tableData.push(this.currentYear);
              this.tableData = mergeTableRow(this.tableData,['areaName'])
            }else{
              this.currentYear.areaName = this.areaName;
              res.content.rowInfo.map((item,index)=>{
                this.historyData[index].year = item;
                this.historyData[index].areaName = this.areaName;
              });
              this.tableData = mergeTableRow(this.historyData,['areaName']);
            }
            setTimeout(()=>{
              this.$refs.table.doLayout();
            },500);
          }
        },err=>{

        })
      }
    }
  }
</script>

<style lang="scss">
  .buildOrganization{

    .upload-demo{
      display: inline-block;
      margin: 0 15px;
    }
  }
</style>
