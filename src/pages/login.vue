<template>
<div id="login">
  <div class="artstyle">
    <span style="margin-bottom:17px;">会员登录</span>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="verifycodetip">
          <div :style="{display:'flex','justify-content':'space-between','align-items':'center'}">
            <el-input placeholder="请输入识别码" v-model="form.captcha" :style="{width: '240px'}"></el-input>
            <img alt="验证码" :src="verifycodeimg" @click="showverifycode()" :style="{width:'150px',height:'60px','margin-left': '10px'}">
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" class="loginbtn">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="gotourl">
      <router-link to="/">立即注册</router-link>
      <router-link to="/chansword">忘记密码</router-link>
    </div>
  </div>
</div>
</template>


<script>
    import Api from '@/api/loginApi';
    import {mapActions} from 'vuex';
    export default {
      data() {
          return {
            verifycodeimg: this.domainName+'/member/captcha?timestamp=' + Date.parse(new Date()),
            form: {
              mobile: '',
              password: '',
              captcha: ''
            },
            rules: {
              mobile: [{
                required: true,
                message: '请输入学校名称',
                trigger: 'blur'
              }],
              password: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
              }],
              captcha: [{
                required: true,
                message: '请输入验证码',
                trigger: 'blur'
              }]
            }
          }
        },
        props: [],
        computed: {

        },
        created: function() {

        },
        methods: {
          onSubmit() {
            var that = this;
            this.verifycodeimg = this.domainName+'/member/captcha?timestamp=' + Date.parse(new Date());
            that.$refs['form'].validate((valid, errormsg) => {
              if (valid) {
                console.log(that.form);
                Api.gologin(that.form).then((data) => {
                  if (data.code == 0) {
                    if (data.data.name) {
                      that.$message.error(data.data.name);
                    } else if (data.data.password) {
                      that.$message.error(data.data.password);
                    } else if (data.data.captcha) {
                      that.$message.error(data.data.captcha);
                    } else {
                      that.$message.error(data.msg);
                    }
                  } else if (data.code == 1) {
                    that.$store.dispatch('Login/isetuid', data.data.uid);
                    that.$store.dispatch('Login/isettoken', data.data.token);
                    if (data.data.status == 0) {
                      that.$router.push({
                        path: '/charter'
                      });
                    }else if (data.data.status == 4) {//未提交
                      that.$router.push({
                        path: '/applicasuc'
                      });
                    } else {
                      that.$router.push({
                        path: '/reviewsuc'
                      });
                    }
                  }
                }).catch(function(error) {
                  console.log(error);
                });
              } else {
                this.$message.error(errormsg[Object.keys(errormsg)[0]][0].message);
                return false;
              }
            });
          },
          showverifycode() {
            this.verifycodeimg = this.domainName+'/member/captcha?timestamp=' + Date.parse(new Date());
          }
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
    #login{
      width:100%;
      height:100%;
      background:url('../assets/background1.png') no-repeat;
      background-size:1920px 100%;background-position:center center;
    }
    .artstyle{
      width:520px;
      height: 500px;
      box-sizing:border-box;
      margin:100px auto;
      background:#ffffff;
      position:relative;
      padding:42px 60px 22px;
      &>span{
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#333333;
        display:block;
      }
    }
    .loginbtn{
      width:400px;
      height: 60px;
      background:#FF3355;
      font-size:26px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:#ffffff;
      border:0;
    }
    .gotourl{
      margin-top:-9px;
      @include displayflex(space-between,center,row,nowrap);
      &>a{
        text-decoration: none;
        font-size: 18px;
      }
      &>:nth-child(1){
        color:#FF3355;
      }
      &>:nth-child(2){
        color:#666666;
      }
    }
    .verifycodetip{
      @include font-style(PingFangSC-Regular,18px,#FF3355,400);
      @include displayflex(center,flex-start,column,nowrap);

    }
</style>
<style lang="scss">
  #login{
    .el-input__inner{
      height:60px;
      font-size: 18px;
      &:focus{
        border-color:#FF3355;
      }
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