<template>
    <div class="artstyle" id="register">
      <div>注册</div>
      <el-form ref="form" :model="form" :rules="rules" label-width="98px">
        <!-- <el-form-item label="学校名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入学校名称"></el-input>
        </el-form-item> -->
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="form.linkman" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile" type="number" :min="0" placeholder="请输入联系人电话"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="mobile_captcha">
          <el-input v-model="form.mobile_captcha" type="number" :min="0" placeholder="请输入验证码" :style="{width: '240px'}"></el-input>
          <button type="" class="getcode" @click="onverify">{{btntip}}</button>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <el-input v-model="form.confirm_password" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
          <el-form-item>
              <el-button @click="onSubmit" class="goregistered">注册</el-button>
          </el-form-item>
      </el-form>
          <div class="gologin">
            已有账号，<router-link to="/login">立即登录></router-link>
          </div>
    </div>
</template>

<script>
    import Api from '@/api/registerApi';
    import {mapActions} from 'vuex';
    export default {
      data() {
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }
          return {
            form: {
              //name: '',
              linkman: '',
              mobile: '',
              mobile_captcha: '',
              password: '',
              confirm_password: ''
            },
            btntip: '获取验证码',
            rules: {
              // name: [{
              //   required: true,
              //   message: '请输入学校名称',
              //   trigger: 'blur'
              // }],
              linkman: [{
                required: true,
                message: '请输入联系人',
                trigger: 'blur'
              }],
              mobile: [{
                required: true,
                message: '请输入手机号',
                trigger: 'blur'
              }],
              mobile_captcha: [{
                required: true,
                message: '请输入手机验证码',
                trigger: 'blur'
              }],
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
          onSubmit() {
            var that = this;
            that.$refs['form'].validate((valid, errormsg) => {
              if (valid) {
                Api.registeruser(that.form).then((data) => {
                  if (data.code === 0) {
                    let str = data.data.linkman ? data.data.linkman : (data.data.mobile ? data.data.mobile : (data.data.mobile_captcha ? data.data.mobile_captcha : (data.data.password ? data.data.password : (data.data.confirm_password ? data.data.confirm_password : data.msg))));
                    that.$message.error(str);
                  } else if (data.code === 1) {
                    that.$message({message: data.msg,type: 'success'});
                    that.$store.dispatch('Login/isetuid', data.data.uid);
                    that.$store.dispatch('Login/isettoken', data.data.token);
                    that.$router.push('/charter');
                  }else{
                    that.$message.error(data.msg);
                  }
                }).catch(function(error) {
                  console.log(error);
                });
              } else {
                that.$message.error(errormsg[Object.keys(errormsg)[0]][0].message);
                return false;
              }
            });
          },
          onverify(event) {
            var that = this;
            this.timecountdown(event,that);
            Api.getverify(this.form.mobile).then((data) => {
              if (data.code == 0) {
                that.$message.error(data.msg);
              }
            }).catch(function(error) {
              console.log(error);
            });

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
    .artstyle{
      margin:60px auto;
      width:610px;
      background:#ffffff;
      position:relative;
      padding:50px 60px;
      box-sizing: border-box;
      @include displayflex(flex-start,center,column,nowrap);
      &>div:nth-child(1){
        font-size:30px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#333333;
        text-align: center;
        @extend %mgto;
        margin-bottom:23px;
      }
    }
    .getcode{
      width:150px;
      height:60px;
      background:#ffffff;
      border:1px solid #FF3355;
      border-radius:3px;
      @include font-style(PingFangSC-Regular,18px,#FF3355,400);
      cursor: pointer;margin-left: 8px;
    }
    .goregistered{
      width:490px;
      height:60px;
      background:#FF3355;
      border:0;
      @include font-style(PingFangSC-Regular,26px,#FFFFFF,500);
      cursor: pointer;margin-left:-84px;margin-top: 38px;
    }
    .gologin{
      @include font-style(PingFangSC-Light,18px,#999999,300);
      text-align: center;
      &>a{
        text-decoration: none;
        color:#FF3355;
        cursor:pointer;
      }
    }
</style>
<style lang="scss">
  #register{
    .el-input__inner{
      height:60px;
      font-size: 18px;
      &:focus{
        border-color:#FF3355;
      }
    }
    .el-form-item__label{
      line-height: 60px;
      color:#333333;
      font-size: 18px;
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