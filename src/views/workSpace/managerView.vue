<template>
  <div class="manager clearfix">
    <div class="fl leftArea">
      <div class="dataArea">
        <div class="accontTop">
          <div class="accontInfo">
            <div class="head_img">
              <img src="~@/assets/images/common/head.png" alt="头像" />
            </div>
            <div class="area">
              <div class="areaName">{{accountInfo.areaName}}</div>
              <div class="timeArea">
                <p class="last">上次登录时间:</p>
                <p class="time">{{accountInfo.upLoginTime}}</p>
              </div>
            </div>
          </div>
          <div class="data_show">
            <div class="data_item">
              <div class="data_img">
                <img src="~@/assets/images/common/mobile.png" alt />
              </div>
              <div class="data_p">
                <p class="data_title">移动用户</p>
                <p class="data_per">{{accountInfo.ydCompleteYearAimNet}}%</p>
              </div>
            </div>
            <div class="data_item">
              <div class="data_img">
                <img src="~@/assets/images/common/wifi.png" alt />
              </div>
              <div class="data_p">
                <p class="data_title">宽带用户</p>
                <p class="data_per">{{accountInfo.kdCompleteYearAimNet}}%</p>
              </div>
            </div>
            <div class="data_item">
              <div class="data_img">
                <img src="~@/assets/images/common/book.png" alt />
              </div>
              <div class="data_p">
                <p class="data_title">天翼高清</p>
                <p class="data_per">{{accountInfo.tyCompleteYearAimNet}}%</p>
              </div>
            </div>
          </div>
          <p class="tip">注：三大主营业务净增完成率</p>
        </div>
        <div class="index_type">
          <div class="index_item">
            <p class="index_title">主营业务收入累计完成</p>
            <p class="index_num">
              <span class="num">{{accountInfo.thisYearLjIncome}}</span>
              <span class="unit">亿元</span>
            </p>
            <p class="index_month">{{accountInfo.monthStr}}</p>
          </div>
          <div class="line"></div>
          <div class="index_item">
            <p class="index_title">主营业务收入增长</p>
            <p class="index_num">
              <span class="num">{{accountInfo.tbYearIncreaseRate}}</span>
              <span class="unit">%</span>
            </p>
            <p class="index_month">{{accountInfo.monthStr}}</p>
          </div>
          <div class="line"></div>
          <div class="index_item">
            <p class="index_title">年度收入预算完成率</p>
            <p class="index_num">
              <span class="num">{{accountInfo.completeYearBudget}}</span>
              <span class="unit">%</span>
            </p>
            <p class="index_month">{{accountInfo.monthStr}}</p>
          </div>
          <div class="line"></div>
          <div class="index_item">
            <p class="index_title">收入累计预算缺口</p>
            <p class="index_num">
              <span class="num">{{accountInfo.gapOfBudgetLj}}</span>
              <span class="unit">万元</span>
            </p>
            <p class="index_month">{{accountInfo.monthStr}}</p>
          </div>
        </div>
      </div>
      <div class="daiban">
        <div class="contentTopTitle">
          <div class="fl">
            <div class="title">快捷入口</div>
          </div>
        </div>
        <div class="db_content">
          <div class="db_item" @click="$router.push({path:'/budget/budgetGuide'})">
            <div class="db_img">
              <img src="~@/assets/images/common/zhiyin.png" alt="">
            </div>
            <p>预算指引</p>
          </div>
          <div class="db_item" @click="$router.push({path:'/budget/newUpToDownOrganization'})">
            <div class="db_img">
              <img src="~@/assets/images/common/fenjie.png" alt="">
            </div>
            <p>预算编制</p>
          </div>
          <div class="db_item" @click="$router.push({path:'/budget/budgetDelivery'})">
            <div class="db_img">
              <img src="~@/assets/images/common/xiada.png" alt="">
            </div>
            <p>预算下达</p>
          </div>
          <div class="db_item" @click="$router.push({path:'/budget/trafficIndicators'})">
            <div class="db_img">
              <img src="~@/assets/images/common/genzong.png" alt="">
            </div>
            <p>预算跟踪</p>
          </div>
          <div class="db_item" @click="$router.push({path:'/budget/budgetDelivery'})">
            <div class="db_img">
              <img src="~@/assets/images/common/tiaozheng.png" alt="">
            </div>
            <p>预算调整</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fl rightArea">
      <div class="message">
        <div class="rect">
          <img src="~@/assets/images/common/email.png" alt />
          <div class="box">
            <ul id="con1" ref="con1" :class="{anim:animate==true}">
              <li v-for="(item,index) in messageList" :key="index" :title="item.name">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="carousel">
        <el-carousel height="24vh">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="~@/assets/images/common/banner.png" alt @click="$router.push({path:'/budget/notice'})"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="message_info">
        <div class="db_list">
          <p class="db_item" v-for="(item,index) in 10" :key="index" @click="$router.push({path:'/budget/notice'})">【公告】2020年全省经营预算指引指导意见</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {$budgetAPI} from "@/api"
export default {
  name: "manager",
  data() {
    return {
      messageList: [
        { name: "【待审核】上城区-关于2020年杭州市预算编制XXXXXXXXXXXXXX" },
        { name: "【待审核】下城区-关于2020年杭州市预算编制XXXXX" },
        { name: "【待审核】萧山区-关于2020年杭州市预算编制XXXXX" }
      ],
      animate: false,
      accountInfo:{}
    };
  },
  created(){
      setInterval(this.scroll, 3000);
  },
  mounted(){
    this.getData();
  },
  methods: {
    //获取指标的数据
    getData(){
      $budgetAPI.getData({},res=>{
        if(res.code == 0){
          this.accountInfo = res.content;
        }else{
          this.alertError(res);
        }
      },err=>{

      })
    },
    scroll() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.messageList.push(this.messageList[0]); // 将数组的第一个元素添加到数组
        this.messageList.shift(); //删除数组的第一个元素
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.manager {
  width: 100%;
  height: 61vh;
  .leftArea {
    width: 66%;
    margin-right: 1%;
    .dataArea {
      width: 100%;
      height: 35vh;
      margin-bottom: 6px;
      border: 1px solid #dee5f3;
      border-radius: 3px;
      background-color: #ffffff;
      .accontTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50%;
        border-bottom: 1px solid #dee5f3;
        position: relative;
        .tip{
          position: absolute;
          bottom: 10px;
          right: 20px;
        }
        .accontInfo {
          margin-left: 20px;
          display: flex;
          .head_img {
            margin-right: 15px;
          }
          .area {
            .areaName {
              margin: 5px 0;
              font-size: 22px;
              font-weight: bold;
            }
            .timeArea {
              .last {
                color: #666666;
              }
              .time {
                color: #999999;
              }
            }
          }
        }
        .data_show {
          width: 60%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .data_item {
            display: flex;
            width: 120px;
            justify-content: space-between;
            align-items: center;
            color: #666666;
            .data_title {
              font-size: 12px;
            }
            .data_per {
              font-size: 18px;
              font-weight: 500;
            }
          }
        }
      }
      .index_type {
        padding: 0 50px;
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .line {
          border-left: 1px solid #dee5f3;
          height: 65px;
        }
        .index_item {
          .index_title {
            font-size: 12px;
            color: #666666;
            margin-bottom: 5px;
          }
          .index_num {
            color: #418ee9;
            margin-bottom: 5px;
            .num {
              font-size: 24px;
              display: inline;
              margin-right: 10px;
            }
            .unit {
              font-size: 14px;
            }
          }
          .index_month {
            color: #ffffff;
            font-size: 13px;
            line-height: 20px;
            height: 20px;
            border-radius: 20px;
            width: 65px;
            text-align: center;
            padding: 0 10px;
            overflow: hidden;
            background-color: #00b7ee;
          }
        }
      }
    }

    .daiban {
      width: 100%;
      height: 25vh;
      border: 1px solid #dee5f3;
      border-radius: 3px;
      background-color: #ffffff;
      .contentTopTitle {
        padding-left: 15px;
        margin: 0 !important;
        .title {
          font-size: 14px;
        }
      }
      .db_content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: calc(25vh - 48px);
      .db_item:hover{
        background-color: #eee;
        padding: 10px;
      }
      .db_item{
        width: 100px;
        cursor: pointer;
        .db_img{
          width: 100%;
          img{
            display: block;
            margin: 0 auto;
          }
        }
        p{
          width:100% ;
          text-align: center;
          color:#333333;
          font-size: 14px;
          font-weight: bold;
          margin-top: 5px;
        }
      }



      }
    }
  }
  .rightArea {
    width: 32%;
    /*height: 100%;*/
    border: 1px solid #dee5f3;
    border-radius: 3px;
    background-color: #ffffff;
    .message {
      width: 100%;
      padding: 10px;
      .rect {
        padding: 10px;
        height: 48px;
        line-height: 48px;
        display: flex;
        align-items: center;
        overflow: hidden;
        background-color: #fcf5f3;
        border: solid 1px #fee2da;
        .box {
          line-height: 16px;
          height: 16px;
          overflow: hidden;
          width: 100%;
          #con1 {
            width: 100%;
            li {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
            }
          }
        }
        .anim {
          transition: all 1s;
          -moz-transition: all 1s; /* Firefox 4 */
          -webkit-transition: 1s; /* Safari 和 Chrome */
          -o-transition: all 1s;
          margin-top: -16px;
          // transform: translate(0,-16px);
        }
      }
    }
    .carousel {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .message_info {
      padding:10px;
      height: 26vh;
      .db_list {
        height: 100%;
        margin-top: 5px;
        overflow-y: scroll;
        .db_item {
          cursor: pointer;
          padding-left: 15px;
          padding-bottom: 5px;
          margin-top: 5px;
          font-size: 14px;
          color: #333333;
          border-bottom: 1px solid #dfe1e4;
        }
      }
    }
  }
}
</style>
