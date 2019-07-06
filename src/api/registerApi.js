import http from './index';
import Vue from 'vue';

export default {
  /*注册*/
  registeruser: function(data) {
    return http.post(Vue.prototype.domainName + '/member/register', data, {
      withCredentials: true
    })
  },
  /*获取验证码*/
  getverify: function(mobile, name) {
    let obj = name ? {
      name: name
    } : {
      mobile: mobile
    };
    return http.post(Vue.prototype.domainName + '/member/sendmessage', obj)
  }
}