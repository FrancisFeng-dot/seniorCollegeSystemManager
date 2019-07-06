<template>
	<div class="artstyle">
		<div>
			<img src="../../assets/icon_changewordsuc.png" alt="">
			<div>
				<span>提交成功</span>
				<span>资料已经全部提交成功，请下载系统生成好的表单盖公章后邮寄给协会</span>
			</div>
		</div>
      	<router-link to="/applicadetail" tag="a"><div>
				<img src="../../assets/icon_pdf.png" alt="">
				<span>{{school_name}}会员申请表下载</span>
			</div>
			<div>
				<img src="../../assets/icon_download01.png" alt="">
				<span>下载</span>
			</div>
		</router-link>
		<div>
			<div>
				<span>邮政编码：</span>
				<span>100123</span>
			</div>
			<div>
				<span>联系电话：</span>
				<span>010-64211225</span>
			</div>
			<div>
				<span>邮寄地址：</span>
				<span>北京市朝阳区青年路113东院悦鑫园3号</span>
			</div>
		</div>
      	<router-link to="/reviewsuc" tag="button">我已邮寄</router-link>
	</div>
</template>

<script>
    import Api from '@/api/loginApi';
	import {mapGetters,mapActions} from 'vuex';
	const md5 = require('md5');
	export default {
	  	data() {
	      return {
	        school_name: ''
	      }
	    },
	    props: [],
	    computed: {
	      ...mapGetters('Login', ['getuid', 'gettoken'])
	    },
	    created: function() {
	    	var that = this;
			if (that.getuid && that.gettoken) {
			  var str = (Date.parse(new Date())) / 1000;
			  var sign = md5('uid=' + that.getuid + '&token=' + that.gettoken + '&timestamp=' + str);
			  var obj = {
			    uid: that.getuid,
			    timestamp: str,
			    sign: sign
			  };

			  Api.getschooldetail(obj).then((data) => {
			    if (data.code == 0) {
			      that.$message.error(data.msg);
			    } else if (data.code == 1) {
			      that.school_name = data.data.name;
		          that.$store.dispatch('Login/isetuserinfo', data.data);
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
	  	background:#ffffff;
	  	padding:52px 0 61px;
	  	margin:111px auto;
	  	@include displayflex(center,center,column,nowrap);
		&>div:nth-child(1){
	  		@include displayflex(center,center,row,nowrap);
	  		&>img{
			  	width:55px;
			  	height:55px;
	  		}
	  		&>div{
	  			margin-left:20px;
	  			@include displayflex(center,flex-start,column,nowrap);
	  			&>span:nth-child(1){
        			@include font-style(PingFangSC-Medium,30px,#333333,500);
	  			}
	  			&>span:nth-child(2){
        			@include font-style(PingFangSC-Regular,18px,#666666,400);
	  			}
	  		}
		}
		&>a{
			cursor:pointer;
			text-decoration: none;
			width:623px;
			height:63px;
			box-sizing:border-box;
			padding:0 30px 0 20px;
			margin:50px auto 25px;
			background:#FFF5F7;
	  		@include displayflex(space-between,center,row,nowrap);
	  		&>div:nth-child(1){
	  			@include displayflex(flex-start,center,row,nowrap);
	  			&>img{
				  	width:20px;
				  	height:24px;margin-right:9px;
		  		}
		  		&>span{
        			@include font-style(PingFangSC-Medium,22px,#333333,500);
		  		}
	  		}
	  		&>div:nth-child(2){
	  			@include displayflex(flex-end,center,row,nowrap);
	  			&>img{
				  	width:24px;
				  	height:24px;margin-right:8px;
		  		}
		  		&>span{
        			@include font-style(PingFangSC-Regular,18px,#FF3355,400);
		  		}
	  		}

		}
		&>div:nth-child(3){
			width:623px;
	  		@include displayflex(center,flex-start,column,nowrap);
        	@include font-style(PingFangSC-Light,18px,#666666,300);
        	&>div{
	  			@include displayflex(flex-start,center,row,nowrap);
	  			&>span{
					line-height: 36px;
	  			}
	  			&>span:nth-child(2){
					color:#333333;
	  			}
        	}
		}
		&>button{
			width:236px;
			height:47px;
			background:#FF3355;
			border-radius:4px;
        	@include font-style(PingFangSC-Regular,18px,#ffffff,400);
        	border:0;
        	margin-top:56px;
        	cursor: pointer;
		}
  	}
</style>