<template>
  <div class="artstyle" id="chansword">
    <span :style="{display:issuc<2?'block':'none'}">{{changetitle}}</span><!-- 找回密码 --><!-- 修改密码 -->
    <el-form ref="modpassword" :model="modpassword" :style="{display:issuc==0?'block':'none'}">
      <el-form-item>
        <el-input placeholder="请输入学校名称" v-model="modpassword.name" @change="getprincipal"></el-input>
      </el-form-item>
      <div class="getphone" :style="{display:showveri==1?'flex':'none'}">
        <span>{{mobile}}</span>
        <button @click="getvrcode" class="verifybtn">{{btntip}}</button>
      </div>
      <el-form-item style="margin-bottom:60px;" :style="{display:showveri==1?'block':'none'}">
        <el-input placeholder="请输入验证码" v-model="modpassword.mobile_captcha" type="number" :min="0"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="verify_suc" class="loginbtn">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="changepass" :model="changepass" :rules="rules1" :style="{display:issuc==1?'block':'none'}">
      <el-form-item prop="password">
        <el-input placeholder="设置新密码" v-model="changepass.password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="confirm_password">
        <div class="passwordtip">
          <el-input placeholder="确认新密码" v-model="changepass.confirm_password" show-password></el-input>
          <span :style="{'line-height':'30px',display:istogether==0?'block':'none'}">密码不一致</span>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="changeword" class="loginbtn">下一步</el-button>
      </el-form-item>
    </el-form>

    <div class="changesucess" :style="{display:issuc==2?'block':'none'}">
      <img src="../assets/icon_changewordsuc.png" alt="">
      <span>修改成功</span>
      <span>您已成功设置密码，请使用新密码登录</span>
      <router-link tag="button" to="/login" class="loginbtn">马上登录</router-link>
    </div>

  </div>
</template>


<script>
    import Api from '@/api/loginApi';
    import Bpi from '@/api/registerApi';
    export default {
      data() {
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.changepass.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }
          return {
            issuc: 0,
            showveri: 0,
            mobile: '',
            token: '',
            changetitle: '找回密码',
            btntip: '获取验证码',
            modpassword: {
              name: '',
              mobile_captcha: ''
            },
            istogether: 1,
            changepass: {
              password: '',
              confirm_password: ''
            },
            rules1: {
              password: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
              }],
              confirm_password: [{
                validator: validatePass,
                trigger: 'blur'
              }]
            }
          }
        },
        props: [],
        computed: {

        },
        methods: {
          getvrcode(event) {
            var that = this;
            this.timecountdown(event,that);
            Bpi.getverify('', that.modpassword.name).then((data) => {
              if (data.code == 0) {
                that.$message.error(data.msg);
              } else {
                that.$message(data.msg);
              }
            }).catch(function(error) {
              console.log(error);
            });
          }, //获取验证码

          verify_suc() {
            if (!this.modpassword.name) {
              this.$message.error('请输入学校名称');
            } else {
              Api.changeverify(this.modpassword).then((data) => {
                if (data.code == 0) {
                  if (data.msg.indexOf('请输入验证码') === -1) {
                    this.$message.error(data.msg);
                  }
                } else if (data.code == 1) {
                  this.issuc = 1;
                  this.token = data.data.token;
                }
              }).catch(function(error) {
                console.log(error);
              });
            }
          }, //修改密码验证
          changeword() {
            this.$refs['changepass'].validate((valid, errormsg) => {
              if (valid) {
                Api.changeword(this.token, this.changepass.password, this.changepass.confirm_password).then((data) => {
                  if (data.code == 0) {
                    this.$message.error(data.msg);
                  } else if (data.code == 1) {
                    this.issuc = 1;
                  }
                }).catch(function(error) {
                  console.log(error);
                });
              } else {
                this.$message.error(errormsg[Object.keys(errormsg)[0]][0].message);
                return false;
              }
            });
          }, //修改密码
          getprincipal(value) {
            Api.getprincipal(value).then((data) => {
              if (data.code == 1) {
                this.showveri = 1;
                this.mobile = data.data.mobile;
              }
            }).catch(function(error) {
              console.log(error);
            });
          } //展示负责人手机
        }
    }
</script>
<style lang="scss" scoped>
  %mgto{
    margin:0 auto;
  }
  %ulst{
    margin:0;
    padding:0;
    list-style: none;
  }

  @mixin displayflex($row,$column,$direction,$wrap){
    display: flex;
    @if $direction == column {
      flex-direction:column;
    }@else{
      flex-direction:row;
    }
    @if $wrap == wrap {
      flex-wrap:wrap;
    }@else{
      flex-wrap:nowrap;
    }
    justify-content:$row;
    align-items:$column;
  }
  .box-border{
  box-sizing:border-box;
  }
  @mixin font-style($family,$size,$color,$weight){
    font-family: $family;
    font-size:$size;
    color:$color;
    font-weight:$weight;
  }

  
    $pd-lf:padding-left;

    .artstyle{
      width:520px;
      box-sizing:border-box;
      margin:110px auto;
      background:#ffffff;
      position:relative;
      padding:52px 60px 60px;
      &>span{
        margin-bottom:52px;
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#333333;
        display:block;
      }
    }
    .getphone{
      @include displayflex(space-between,center,row,nowrap);
      margin-bottom:30px;
      &>span{
        @include font-style(PingFangSC-Regular,20px,#333333,400);
      }
      &>button{
        width:150px;
        height: 60px;
        background:#ffffff;
        @include font-style(PingFangSC-Regular,18px,#FF3355,400);
        border:1px solid #FF3355;
      }
    }
    .loginbtn{
      width:400px;
      height: 60px;
      background:#FF3355;
      @include font-style(PingFangSC-Medium,26px,#ffffff,500);
      border:0;
    }
    .passwordtip{
      @include displayflex(center,flex-start,column,nowrap);
      @include font-style(PingFangSC-Regular,18px,#FF3355,400);
    }
    .changesucess{
      @include displayflex(flex-start,center,column,nowrap);
      &>img{
        width:64px;
        height: 64px;
        margin-bottom:20px;
      }
      &>span:nth-child(2){
      @include font-style(PingFangSC-Medium,30px,#333333,500);
        margin-bottom:18px;
      }
      &>span:nth-child(3){
      @include font-style(PingFangSC-Regular,18px,#666666,400);
        margin-bottom:97px;
      }
    }
</style>
<style lang="scss">
  #chansword{
    .el-input__inner{
      height:60px;
      font-size: 18px;
      &:focus{
        border-color:#FF3355;
      }
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-button{
      &:active,&:focus,&:hover{
        color:#ffffff;
        border-color:#FF3355;
        background-color:#FF3355;
      }
    }
  }
</style>