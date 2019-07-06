<template>
	<div class="artstyle">
		<img src="../../assets/icon_changewordsuc.png" alt="" :style="{display:icon_result==2?'block':'none'}">
		<img src="../../assets/icon_nosucapplic.png" alt="" :style="{display:icon_result==3?'block':'none'}">
		<img src="../../assets/icon_underreview.png" alt="" :style="{display:icon_result==1?'block':'none'}">
		<span>{{tip}}</span>
		<div v-html="desc"></div>
		<button type="" :style="{background:icon_result==2?'#FF3355':'#999999'}">{{change}}</button>
	</div>
</template>

<script>
    import Api from '@/api/loginApi';
	import {mapGetters} from 'vuex';
	const md5 = require('md5');
	export default {
	  data() {
	      return {
	        icon_result: 2,
	        tip: '',
	        desc: '',
	        change: ''
	      }
	    },
	    props: [],
	    computed: {
	      ...mapGetters('Login', ['getuid', 'gettoken'])
	    },
	    created: function() {
	      	var that = this;
			if (that.getuid && that.gettoken) {
			  var str = Date.parse(new Date());
			  var sign = md5('uid=' + that.getuid + '&token=' + that.gettoken + '&timestamp=' + str);
			  var obj = {
			    uid: that.getuid,
			    timestamp: str,
			    sign: sign
			  }
			  Api.getschool(obj).then((data) => {
			    if (data.code == 1) {
			      that.icon_result = data.data.status;
			      that.tip = that.icon_result == 3 ? '您的入会申请未通过' : (that.icon_result == 2 ? '恭喜你成功加入协会' : (that.icon_result == 1 ? '您的入会申请还在审核中' : ''));
			      that.desc = that.icon_result == 3 ? '您提交的开发者信息未通过审核，请参照下列审核意见进行修改：' + data.data.check_advice + '<br>请更改信息后从新提交。如有疑问请联系客服：<span style="color:#F53251;">010-12345678</span>' : (that.icon_result == 2 ? '尊敬的' + data.data.name + '，欢迎你成为协会的第' + data.data.member_rank + '位会员单位' : (that.icon_result == 1 ? '尊敬的' + data.data.name + '，您的入会申请还在审核中，请保证联系人的电话畅通并注意查收邮件。' : ''));
			      that.change = that.icon_result == 3 ? '返回修改' : (that.icon_result == 2 ? '进入系统' : (that.icon_result == 1 ? '正在审核' : ''));
			    }
			  }).catch(function(error) {
			    console.log(error);
			  });
			} else {
			  that.$router.push({
			    path: '/login'
			  });
			}
	    },
	    methods: {

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
	  	width:1200px;
	  	height:525px;
	  	background:#ffffff;
	  	margin: 111px auto;
	  	@include displayflex(center,center,column,nowrap);
	  	&>img{
	  		width:63px;
	  		height: 63px;
	  		margin-bottom:20px;
	  	}
		&>span{
        	@include font-style(PingFangSC-Medium,30px,#333333,500);
	  		margin-bottom:16px;
		}
		&>div{
        	@include font-style(PingFangSC-Regular,18px,#666666,300);
        	line-height: 30px;
        	text-align: center;
		}
		&>button{
			width:236px;
			height:47px;
			border-radius:4px;
        	@include font-style(PingFangSC-Regular,18px,#ffffff,400);
        	border:0;
        	margin-top:56px;
		}
  	}
</style>