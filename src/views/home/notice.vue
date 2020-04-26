<template>
  <div class="notice">
    <div class="left-wrap">
      <div class="breadcrumb-wrap">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/budget/home'}">
            <i class="el-icon-s-home"></i>个人工作台
          </el-breadcrumb-item>
          <el-breadcrumb-item>公告】2020年全省经营预算指引指导意见</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="notice-content">
        <div class="user-info">
          <div class="avater-wrap">
            <img v-if="avater" src alt class="avater" />
            <img v-else src="~@/assets/images/common/head.png" alt class="avater" />
          </div>
          <div class="title-wrap">
            <p class="title">2020年全省经营预算指引指导意见</p>
            <p class="name-wrap">
              <span class="name">刘三元</span>
              <span class="area">浙江省公司</span>
              <span class="time">3天前</span>
            </p>
          </div>
        </div>
        <div class="notice-box">
          <p>课程背景</p>
          <p>调查指出：具备【互联网时代产品管理知识】与【实务经验】的产品经理，不仅年薪上看50万人民币，亦是最有机会晋升高阶主管的关键职务之一。</p>
          <p>创新经济时代来临，面对快速变迁与激烈竞争的市场环境，企业必须藉由持续开发新产品，才能应对产品生命周期急剧缩短所带来的经营危机。因此，「产品经理」不但扮演了统合项目经理的角色，更是肩负新产品开发成败的人物，是近年来全球各大企业争相高薪聘雇、挖脚的主要对象。</p>
          <p>在这种全新的商业环境与生态环境下，产品管理与相对应的产品开发过程与工具也必须改变以跟上潮流。因此，『互联网+』时代的产品经理与产品从业人员光拥有传统的能力，例如懂得市场细分与品牌策略管理并不足以完全满足市场与顾客的需求与挑战。必须培养新的产品管理能力与更新思维方式，才可以在竞争激烈的商场上立足。</p>
          <p>课程介绍</p>
          <p>产品经理国际资格认证，NewProductDevelopmentProfessional（NPDP），由美国产品开发与管理协会（PDMA）所发起，是国际的新产品开发专业认证，集理论、方法与实践为一体的全方位知识体系，为公司组织层级进行规划、决策、执行提供良好的方法体系支撑。</p>
          <p>该知识体系包括新产品战略、产品组合管理、新产品开发流程、产品生命周期管理、工具与测评、市场研究、团队、人员与组织七大领域。该协会成立于1979年，是全球范围内产品开发与管理专业人士的倡导者。协助个人、企业或组织提升其产品开发与管理的能力与成效，为会员提供产品领域的专业级开发资源、信息和合作，以推动新产品开发和管理。</p>
        </div>
        <div class="download">
          <div class="btn-wrap">
            <el-button size="mini" type="info">附件下载</el-button>
          </div>
          <ul class="item-box">
            <li class="item">
              <img src="~@/assets/images/common/down.png" alt />
              <span>2020年全省经营预算指引指导意见</span>
            </li>
          </ul>
        </div>
        <div class="like-wrap">
          <span class="like-left">
            <img v-if="like" src="~@/assets/images/common/xin-like.png" alt />
            <img v-else src="~@/assets/images/common/xin.png" alt />
            <span>点赞</span>
          </span>
          <span class="like-right">6</span>
        </div>
        <div class="textarea-wrap">
          <textarea name id cols="30" rows="10"></textarea>
          <div class="reply">回复</div>
        </div>
        <div class="evaluate-wrap">
          <h5>最新回复 (2)</h5>
          <ul class="evaluate-box">
            <li class="evaluate-item">
              <div class="evaluate-box">
                <div class="avater-wrap">
                  <img v-if="avater" src alt class="avater" />
                  <img v-else src="~@/assets/images/common/head.png" alt class="avater" />
                </div>
                <div class="title-wrap">
                  <p class="name-wrap">
                    <span class="name">丁保奇</span>
                    <span class="area">杭州分公司</span>
                    <span class="time">6分钟前</span>
                  </p>
                  <p class="title">
                    这份指导意见太及时了，感谢！
                  </p>
                </div>
              </div>
              <div class="other">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </li>
            <li class="evaluate-item">
              <div class="evaluate-box">
                <div class="avater-wrap">
                  <img v-if="avater" src alt class="avater" />
                  <img v-else src="~@/assets/images/common/head.png" alt class="avater" />
                </div>
                <div class="title-wrap">
                  <p class="name-wrap">
                    <span class="name">丁保奇</span>
                    <span class="area">杭州分公司</span>
                    <span class="time">6分钟前</span>
                  </p>
                  <p class="title">
                    这份指导意见太及时了，感谢！
                  </p>
                </div>
              </div>
              <div class="other">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-wrap">
       <div>
         <el-button @click="release"><i class="iconfont icon-fabu"></i> 发布</el-button>
       </div>
        <div class="announcement-content">
          <div class="announcement-title">
            <span>相关链接</span>
          </div>
          <ul class="announcement-link">
            <li v-for="(item,index) in 10" :key="index"><p>【公告】2020年全省经营预算指引指导意见</p></li>
          </ul>
        </div>
    </div>
    <el-dialog :visible.sync="releaseDialog" title="发布" width="60%">
        <el-form :inline="true" :model="releaseForm" >
          <el-form-item >
            <el-input v-model="releaseForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item >
            <div class="edit_container">
              <quill-editor v-model="releaseForm.content" ref="myQuillEditor"  :options="editorOption">
              </quill-editor>
            </div>

          </el-form-item>
          <el-form-item >
            <template slot-scope="scope">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :beforeUpload="beforeAvatarUpload"
                :file-list="fileList"
                :before-remove="beforeRemove"
              >
                <span><i class="iconfont icon-wenjian"></i> <el-link  plain>添加附件</el-link></span>
              </el-upload>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>

  </div>
</template>

<script>
    import {
        quillEditor
    } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
export default {
  data() {
    return {
      releaseForm:{
          title:"",
          content:'',
          editorOption: {}
      },
      avater: "",
      like: true,
      releaseDialog:false,
    };
  },
    components: {
        quillEditor
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods :{
        release(){
            this.releaseDialog=true
        },
        onSubmit(){
            this.releaseDialog=false
        },
        onEditorReady(editor) {
        },

    },
};
</script>
<style lang="scss">
.notice {
  .el-breadcrumb {
    display: inline-block;
  }
}
</style>
<style scoped lang="scss">
.notice {
  /deep/ .el-dialog__body{
    padding: 10px 20px;
  }
  .left-wrap {
    width: 66%;
    margin-right: 1%;
    display: inline-block;
    .breadcrumb-wrap {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-indent: 3px;
      border: 1px solid rgba(222, 229, 243, 1);
      .el-icon-s-home {
        margin-right: 5px;
      }
    }
    .notice-content {
      width: 100%;
      margin-top: 10px;
      border: 1px solid rgba(222, 229, 243, 1);
      .user-info {
        height: 86px;
        line-height: 86px;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        .avater-wrap {
          display: inline-block;
          width: 47px;
          height: 47px;
          margin-top: 18px;
          margin-left: 6px;
          vertical-align: top;
          img {
            width: 47px;
            height: 47px;
            border-radius: 50%;
          }
        }
        .title-wrap {
          display: inline-block;
          margin-left: 4px;
          .title {
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 16px;
            font-size: 16px;
          }
          .name-wrap {
            font-weight: 400;
            font-size: 12px;
            color: rgba(102, 102, 102, 1);
            line-height: 16px;
            position: relative;
            top: 8px;
            .area {
              background: rgba(0, 183, 238, 1);
              border: 1px solid rgba(243, 247, 255, 1);
              border-radius: 4px;
              padding: 2px 4px;
              color: #fff;
            }
          }
        }
      }
      .notice-box {
        width: 90%;
        margin: 20px auto;
      }
      .download {
        width: 94.5%;
        height: 77px;
        margin: 50px auto;
        position: relative;
        background: rgba(248, 249, 250, 1);
        border: 1px solid rgba(170, 170, 171, 1);
        .btn-wrap {
          position: absolute;
          top: -14px;
          left: 30px;
        }
        ul {
          width: 100%;
          padding-top: 20px;
          li {
            height: 30px;
            line-height: 30px;

            img {
              margin-left: 10px;
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
      .like-wrap {
        width: 126px;
        height: 35px;
        margin: 50px auto;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(170, 170, 171, 1);
        border-radius: 4px;
        font-size: 0;
        .like-left {
          width: 90px;
          height: 100%;
          line-height: 35px;
          display: inline-block;
          text-align: center;
          font-size: 14px;
          border-right: 1px solid rgba(170, 170, 171, 1);
          img {
            width: 15px;
            height: 15px;
          }
        }
        .like-right {
          line-height: 35px;
          height: 35px;
          width: 33px;
          font-size: 16px;
          display: inline-block;
          color: #418ee9;
          text-align: center;
        }
      }
      .textarea-wrap {
        width: 94.5%;
        margin: 0 auto;
        position: relative;
        textarea {
          width: 100%;
          height: 128px;
          border: 1px solid #d2d2d2;
        }
        .reply {
          position: absolute;
          bottom: -40px;
          right: 0;
          background-color: #418ee9;
          padding: 8px 40px;
          color: #fff;
          font-size: 14px;
          border-radius: 4px;
        }
      }
      .evaluate-wrap {
        width: 95.1%;
        margin: 90px auto 30px;
        h5 {
          color: #333333;
          font-size: 14px;
        }
        ul {
          li {
            width: 100%;
            padding-top: 26px;
            padding-bottom: 14px;
            border-bottom: 1px solid #d2d2d2;
            display: flex;
            justify-content: space-between;
            .evaluate-box {
              .avater-wrap {
                display: inline-block;
                width: 41px;
                height: 41px;
                margin-left: 6px;
                margin-right: 6px;
                vertical-align: top;
                img {
                  width: 47px;
                  height: 47px;
                  border-radius: 50%;
                }
              }
              .title-wrap {
                display: inline-block;
                margin-left: 4px;

                .name-wrap {
                  font-weight: 400;
                  font-size: 12px;
                  color: rgba(102, 102, 102, 1);

                  .area {
                    background: rgba(0, 183, 238, 1);
                    border: 1px solid rgba(243, 247, 255, 1);
                    border-radius: 4px;
                    padding: 2px 4px;
                    color: #fff;
                  }
                }
                .title {
                  font-weight: 400;
                  color: rgba(51, 51, 51, 1);
                  font-size:14px;
                  margin-top: 18px;
                }
              }
            }
          }
        }
      }
    }
  }
  .right-wrap {
    width: 32%;
    display: inline-block;
    float: right;
    .el-button{
      width: 100%;
      background-color: #ffc41e;
      color: #fff;
      border: none;
      height: 40px;
      .icon-fabu{
        margin-right: 30px;
      }
    }
    .announcement-content{
      margin-top: 10px;
      border:1px solid #dee5f3;
      border-radius: 4px;
      .announcement-title{
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dee5f3;
        padding-left: 20px;
        span{
          border-left:3px solid #4186f3;
          padding-left: 10px;
        }
      }
      .announcement-link{
        padding:0 10px;
        li{
          border-bottom: 1px solid #dee5f3;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          p{
            padding: 0 10px;
          }
        }
        li:last-child{
          border-bottom:none;
        }
      }
    }
  }
  .el-form-item{
    width: 100%;
    margin-bottom: 10px;
    /deep/ .el-form-item__content{
      width: 100%;
     .icon-wenjian{
       margin-right: 10px;
     }
      .el-link:hover::after{
       border:none;
      }
    }
  }
  .el-form-item:last-child{
    /deep/ .el-form-item__content{
      width: 100%;
      text-align: center;
    }
  }
/deep/ .ql-container{
  height: 200px;
}

}
</style>
