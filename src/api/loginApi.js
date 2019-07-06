import http from './index';
import Vue from 'vue';

export default {
  /*登录*/
  gologin: function(data) {
    return http.post(Vue.prototype.domainName + '/member/login', data)
  },
  /*获取学校状态*/
  getschool: function(data) {
    return http.post(Vue.prototype.domainName + '/member/getaccountstatus', data)
  },
  /*获取负责人手机号*/
  getprincipal: function(school) {
    return http.post(Vue.prototype.domainName + '/member/getmobile', {
      name: school
    })
  },
  /*验证可以修改密码*/
  changeverify: function(data) {
    return http.post(Vue.prototype.domainName + '/member/editpasswordverify', data)
  },
  /*验证密码修改*/
  changeword: function(token, password, confirm_password) {
    return http.post(Vue.prototype.domainName + '/member/editpassword', {
      token: token,
      password: password,
      confirm_password: confirm_password
    })
  },
  /*提交学校信息表单*/
  requestform: function(data) {
    return http.post(Vue.prototype.domainName + '/member/addmemberinfo', data)
  },
  /*获取学校信息表单*/
  getschooldetail: function(data) {
    return http.post(Vue.prototype.domainName + '/member/getMemberInfo', data)
  }
}