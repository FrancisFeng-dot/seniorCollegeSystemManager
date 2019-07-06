<template>
	<div class="artstyle">
		<button type="button" @click="getPdf()">导出PDF</button>
		<div class="tablestyle" id="gettopdf">
			<div>
				<span>中国老年大学协会</span>
				<span>会员登记表</span>
				<div>
					<span>填表单位（盖章）：</span>
					<div>填表日期：<hr>年<hr>月<hr>日</div>
				</div>
				<div><hr><span>01</span><hr></div>
			</div>
			<div>
				<span>中国老年大学协会会员登记表一</span>
				<div><span>学校名称：</span><p>{{getuserinfo.name}}</p></div>
				<div><span>创办时间：</span><p>{{getuserinfo.establish_time}}</p></div>
				<div><span>主管部门：</span><p>{{getuserinfo.department}}</p></div>
				<div><span>学校性质：</span><p>{{getuserinfo.property}}</p></div>
				<div><span>领导体制：</span><p>{{getuserinfo.leader_system}}</p></div>
				<div><span>学校级别：</span><p>{{getuserinfo.school_level}}</p></div>
				<div><span>通讯地址：</span><p>{{getuserinfo.address}}</p></div>
				<div><span>办公室电话：</span><p>{{getuserinfo.office_telephone}}</p></div>
				<div><span>教务处电话：</span><p>{{getuserinfo.dean_telephone}}</p></div>
				<div><span>电子邮箱：</span><p>{{getuserinfo.email}}</p></div>
				<div><span>学校网址：</span><p>{{getuserinfo.website}}</p></div>
				<div><span>学校领导情况：</span><p v-html="str"></p></div>
				<div><span>学校内设机构：</span><p>{{getuserinfo.institute}}</p></div>
				<div><span>校刊校报名称：</span><p>{{getuserinfo.journal}}</p></div>
				<div><span>设班情况：</span><p>{{'普通班'+getuserinfo.general_class+'个、'+'提高班'+getuserinfo.enhance_class+'个、'+'研究班'+getuserinfo.research_class+'个、'+'其他'+getuserinfo.other_class+'个'}}</p></div>
				<div><span>专业设置：</span><p>{{getuserinfo.major}}</p></div>
				<div><span>主要课程：</span><p>{{getuserinfo.main_lesson}}</p></div>
				<div><hr><span>02</span><hr></div>
			</div>
			<div>
				<span>中国老年大学协会会员登记表二</span>
				<div><span>学员：</span><p>{{'在校人数：'+getuserinfo.in_school+'人&nbsp;/&nbsp;其中女性：'+getuserinfo.female+'人'}}</p></div>
				<div><span>在校学员情况：</span><p v-html="str2"></p></div>
				<div><span>教师：</span><p v-html="str3"></p></div>
				<div><span>工作人员：</span><p>{{'在编：'+getuserinfo.regular_worker+'人&nbsp;/&nbsp;聘用：'+getuserinfo.employ_worker+'人'}}</p></div>
				<div><span>校舍情况：</span><p>{{'固定面积：'+getuserinfo.fixed_area+'m&sup2;&nbsp;/&nbsp;非固定面积：'+getuserinfo.not_fixed_area+'m&sup2; '}}</p></div>
				<div><span>经费来源：</span><p v-html="str4"></p></div>
				<div><hr><span>03</span><hr></div>
			</div>
			<div>
				<span>中国老年大学协会会员登记表三</span>
				<span>申请入会学校推荐单位的意见（已是会员的单位不需要填写）:</span>
				<div></div>
				<div>
					<span>推荐单位公章：</span>
					<div><hr><span>年</span><hr><span>月</span><hr><span>日</span></div>
				</div>
				<div><hr><span>04</span><hr></div>
			</div>
		</div>
	</div>
</template>

<script>
    import htmlTopdf from '@/util/htmlToPdf';
    import {mapGetters} from 'vuex';
	export default {
		data() {
	      return {
	      	str:'',
	      	str2:'',
	      	str3:'',
	      	str4:'',
	      	htmlTitle: '老年大学协会会员登记表'
	      }
	    },
	    props: ['articletitle'],
	    computed: {
	      ...mapGetters('Login', ['getuserinfo'])
	    },

	    created: function() {
	    	var that = this;
	    	var arr = Object.keys(that.getuserinfo);
	    	if(arr.length>0){
		    	that.getuserinfo.lead_array.forEach(function(item,index){
		    		that.str += item.name+'&nbsp;/&nbsp;'+item.gender+'&nbsp;/&nbsp;出生日期：'+item.birthday+'&nbsp;/&nbsp;职务：'+item.present_position+'原职务：'+item.previous_position;
		    		if(index<that.getuserinfo.lead_array.length-1){
		    			that.str += '<br>'
		    		}
		    	});
		    	that.str2 = '离休干部：'+that.getuserinfo.in_school_cadre+'人&nbsp;/&nbsp;'+'退休干部：'+that.getuserinfo.retire_cadre+'人&nbsp;/&nbsp;'+'退休职工：'+that.getuserinfo.retire_worker+'人&nbsp;/&nbsp;'+'其他：'+that.getuserinfo.other_worker+'人<br>'+'80岁以上：'+that.getuserinfo.higher_than_80+'人&nbsp;/&nbsp;'+'65-79岁：'+that.getuserinfo.between_65_and_79+'人&nbsp;/&nbsp;'+'50-64岁：'+that.getuserinfo.between_50_and_64+'人&nbsp;/&nbsp;'+'49岁以下：'+that.getuserinfo.lower_than_49+'人<br>'+'大专以上：'+that.getuserinfo.junior_college+'人&nbsp;/&nbsp;'+'中学：'+that.getuserinfo.middle_school+'人&nbsp;/&nbsp;'+'小学：'+that.getuserinfo.primary_school+'人&nbsp;/&nbsp;'+'其他：'+that.getuserinfo.other_education+'人';
		    	that.str3 = '专职：'+that.getuserinfo.sole+'人&nbsp;/&nbsp;其中高级职称：'+that.getuserinfo.sole_senior_rank+'人<br>'+'聘请：'+that.getuserinfo.employ+'人&nbsp;/&nbsp;其中高级职称：'+that.getuserinfo.employ_senior_rank+'人<br>'+'师资主要来源：'+that.getuserinfo.source;
		    	that.str4 = '每年政府拨款:'+that.getuserinfo.gov_appropriation+'万<br>'+'每年学费总收入:'+that.getuserinfo.tuition+'万<br>'+'一学期个人学费：最高'+that.getuserinfo.person_highest_tuition+'元&nbsp;/&nbsp;最低'+that.getuserinfo.person_lowest_tuition+'元<br>'+'捐赠：'+that.getuserinfo.donation+'元<br>其他收入:'+that.getuserinfo.other_income+'元<br>来源:'+that.getuserinfo.other_income_source;
	    	}else{
	    		that.$router.push({path: '/login'});
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
	.thefooter{
		@include font-style(PingFangSC-Regular,18px,#999999,400);
		@include displayflex(center,center,row,nowrap);
		&>hr{
			width:18px;
		}
		&>span{
			margin:0 6px;
		}
	}

	.artstyle{
		width:900px;
		background:#ffffff;
		margin:10px auto;
		position:relative;
		&>button:nth-child(1){
			position:absolute;
			top:24px;
			right:24px;
			background:url('../../assets/pdfdown.png') no-repeat;
			background-position: 6px center;
			background-size:18px 18px;
			border:2px solid #FF3355;
			width: 120px;
			border-radius: 10px;
			height:40px;
			cursor: pointer;z-index:1;
		}
	}
	.tablestyle{
		width:100%;
	  	@include displayflex(flex-start,center,column,nowrap);
		&>div{
			width:100%;
			height:1280px;
			position:relative;
			
			&:nth-child(1){
	  			@include displayflex(flex-start,center,column,nowrap);
				&>span:nth-child(1){
		  			@include font-style(PingFangSC-Medium,60px,#333333,500);
					margin:230px auto 36px;
				}
				&>span:nth-child(2){
		  			@include font-style(PingFangSC-Medium,54px,#666666,500);
				}
				&>div:nth-child(3){
					margin-top:580px;
		  			@include font-style(PingFangSC-Regular,18px,#333333,400);
		  			@include displayflex(flex-start,flex-start,column,nowrap);
					&>div{
						margin-top:32px;
		  				@include displayflex(flex-start,center,row,nowrap);
		  				&>hr{
		  					width:60px;margin-bottom: -10px;
		  				}
					}
				}
				&>div:nth-child(4){
		  			@extend .thefooter;
		  			margin-top:100px;
				}
			}
			
			&:nth-child(2),&:nth-child(3){
				@extend .box-border;
				padding: 0 60px;
	  			@include displayflex(flex-start,flex-start,column,nowrap);
				&>span:nth-child(1){
					align-self:center;
		  			@include font-style(PingFangSC-Semibold,30px,#333333,600);
					margin:94px auto 54px;
				}
				&>div{
					margin:12px 0;
		  			@include font-style(PingFangSC-Semibold,18px,#333333,400);
		  			@include displayflex(flex-start,flex-start,row,nowrap);
					&>span{
						font-weight:600;
						width:126px;text-align:right;display:block;
					}
					&>p{
						margin:0;
						margin-left:16px;
						width:640px;
					}
				}
			}
			&:nth-child(2){
				&>div:last-child{
					width:76px;
		  			@extend .thefooter;
		  			position:absolute;
		  			bottom:60px;
		  			left:0;
		  			right:0;
		  			margin:auto;
		  			&>span{
		  				width: auto;
		  			}
				}
			}
			&:nth-child(3){
				&>div:last-child{
					align-self:center;
		  			@extend .thefooter;
		  			margin-top:500px;
		  			&>span{
		  				width: auto;
		  			}
				}
			}
			
			&:nth-child(4){
				@extend .box-border;
				padding: 0 60px;
	  			@include displayflex(flex-start,center,column,nowrap);
				&>span:nth-child(1){
		  			@include font-style(PingFangSC-Semibold,30px,#333333,600);
					margin:90px auto 48px;
				}
				&>span:nth-child(2){
		  			@include font-style(PingFangSC-Regular,20px,#333333,400);
		  			align-self:flex-start;
				}
				&>div:nth-child(3){
					width:780px;
					height:633px;border:1px solid #cccccc;
					margin:24px 0 137px;
				}
				&>div:nth-child(4){
		  			align-self:flex-end;
		  			@include font-style(PingFangSC-Regular,18px,#333333,400);
		  			@include displayflex(flex-start,flex-start,column,nowrap);
					&>div{
						margin-top:32px;
		  				@include displayflex(flex-start,center,row,nowrap);
		  				&>hr{
		  					width:60px;margin-bottom: -10px;
		  				}
					}
				}
				&>div:nth-child(5){
		  			@extend .thefooter;
		  			margin-top:70px;
				}
			}
		}
	}
</style>