// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import filters from './util/filter';
import Common from './util/common';
import WebConfig from './util/config';
import htmlToPdf from './util/htmlToPdf';
/*兼容IE浏览器*/
import 'babel-polyfill';
import store from './store/index';

/*装载filter文件*/
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.config.productionTip = false;
/*UI控件*/
Vue.use(ElementUI);
/*轮播控件*/
// Vue.use(VueAwesomeSwiper);
/*公共方法*/
Vue.use(Common);
/*公共配置*/
Vue.use(WebConfig);
/*生成canvas*/
Vue.use(htmlToPdf);


/* eslint-disable no-new */
const vm = new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
});