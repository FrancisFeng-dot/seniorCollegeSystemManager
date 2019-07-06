<template>
  <div class="artstyle" id="requestuserinfo">
  	<span>会员单位申请</span>
    <el-steps :active="active" direction="horizontal" style="width:380px;margin-bottom: 30px;">
    	<el-step></el-step>
    	<el-step></el-step>
    	<el-step></el-step>
    </el-steps>
    <div>
	  <el-form ref="form" :model="form" :rules="rules" label-width="140px">
	    <div :style="{ display: active==0?'flex':'none','flex-direction': 'column','justify-content': 'flex-start','align-items': 'center'}" class="form1">
	      <div style="width:700px;">
	        <el-form-item label="学校名称" prop="name">
	            <el-input v-model="form.name" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="创办时间">
	            <el-date-picker type="date" placeholder="请输入学校创办时间" v-model="form.establish_time" style="width: 100%;" :clearable="isfalse"></el-date-picker>
	        </el-form-item>
	        <el-form-item label="主管部门">
	          <el-input v-model="form.department" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="学校性质">
	          <el-radio-group v-model="form.property">
	            <el-radio label="公办"></el-radio>
	            <el-radio label="民办"></el-radio>
	            <el-radio label="公办民助"></el-radio>
	            <el-radio label="民办公助"></el-radio>
	          </el-radio-group>
	        </el-form-item>
	        <el-form-item label="领导体制">
	          <el-select v-model="form.leader_system" placeholder="请选择">
	            <el-option label="校长负责制" value="校长负责制"></el-option>
	            <el-option label="校务委员会领导下的校长负责制" value="校务委员会领导下的校长负责制"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="学校级别">
	          <el-select v-model="form.school_level" placeholder="请选择">
	            <el-option label="厅局级" value="厅局级"></el-option>
	            <el-option label="县处级" value="县处级"></el-option>
	            <el-option label="科级" value="科级"></el-option>
	          </el-select>
	        </el-form-item>
	        <el-form-item label="通讯地址">
	          <el-input v-model="form.address" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="办公室电话">
	          <el-input v-model="form.office_telephone" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="教务处电话">
	          <el-input v-model="form.dean_telephone" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="电子邮箱" prop="email">
	          <el-input v-model="form.email" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="学校网址">
	          <el-input v-model="form.website" placeholder="请输入"></el-input>
	        </el-form-item>
	      </div>
	      <div style="font-size: 30px;color:#333333;margin:50px 0 48px;text-align: center;font-weight:600;">学校领导成员情况</div>

	      <el-table :data="form.lead_array" ref="table">
	        <el-table-column label="姓名" align="left" width="136">
	          <template slot-scope="scope">
	            <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
	          </template>
	        </el-table-column>
	        <el-table-column label="性别" width="150">
	          <template slot-scope="scope">
	            <el-select v-model="scope.row.gender" placeholder="请选择">
	              <el-option label="男" value="男"></el-option>
	              <el-option label="女" value="女"></el-option>
	            </el-select>
	          </template>
	        </el-table-column>
	        <el-table-column label="出生日期" width="156">
	          <template slot-scope="scope">
	            <el-date-picker type="date" placeholder="请输入" v-model="scope.row.birthday" style="width: 100%;" :clearable="isfalse"></el-date-picker>
	          </template>
	        </el-table-column>
	        <el-table-column label="在校职务" width="176">
	          <template slot-scope="scope">
	            <el-select v-model="scope.row.present_position" placeholder="请选择">
	              <el-option label="名誉校长" value="名誉校长"></el-option>
	              <el-option label="校长" value="校长"></el-option>
	              <el-option label="副校长" value="副校长"></el-option>
	            </el-select>
	          </template>
	        </el-table-column>
	        <el-table-column label="现(原)任职务" width="176">
	          <template slot-scope="scope">
	            <el-input v-model="scope.row.previous_position" placeholder="请输入"></el-input>
	          </template>
	        </el-table-column>
	        <el-table-column label="电话" width="186">
	          <template slot-scope="scope">
	            <el-input type="number" :min="0" v-model="scope.row.mobile" placeholder="请输入"></el-input>
	          </template>
	        </el-table-column>
	      </el-table>
	      <div style="display:flex;justify-content:flex-start;align-items:center;margin: 15px 0px 98px;width: 100%;">
	      	<img src="../../assets/addschoolinfo.png" alt="">
	      	<span @click.prevent="addRow()" style="font-size:18px;color:#FF3355;margin-left:9px;cursor:pointer;">添加领导</span>
	      </div>
	      <div style="width:700px;">
	        <el-form-item label="学校内设机构">
	          <el-input v-model="form.institute" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="校刊校报名称">
	          <el-input v-model="form.journal" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="设班情况" style="margin:58px 0 29px;width: 740px;">
	        	<el-col :span="12">
		          <el-form-item label="普通班" label-width="82px">
		            <el-input v-model="form.general_class" type="number" :min="0" style="width:150px;margin-left:-19px;"></el-input><span style="margin-left:9px;">个</span>
		          </el-form-item>
	          	</el-col>
	        	<el-col :span="12">
	          <el-form-item label="提高班" label-width="82px">
	            <el-input v-model="form.enhance_class" type="number" :min="0" style="width:150px;margin-left:-19px;"></el-input><span style="margin-left:9px;">个</span>
	          </el-form-item>
	          	</el-col>
	        	<el-col :span="12">
	          <el-form-item label="研究班" label-width="82px">
	            <el-input v-model="form.research_class" type="number" :min="0" style="width:150px;margin-left:-19px;"></el-input><span style="margin-left:9px;">个</span>
	          </el-form-item>
	          	</el-col>
	        	<el-col :span="12">
	          <el-form-item label="其他" label-width="82px">
	            <el-input v-model="form.other_class" type="number" :min="0" style="width:150px;margin-left:-19px;"></el-input><span style="margin-left:9px;">个</span>
	          </el-form-item>
	          	</el-col>
	        </el-form-item>
	        <el-form-item label="专业设置">
	          <el-input v-model="form.major" placeholder="请输入"></el-input>
	        </el-form-item>
	        <el-form-item label="主要课程">
	          <el-input v-model="form.main_lesson" placeholder="请输入"></el-input>
	        </el-form-item>
	      </div>
	      <el-button style="margin: 70px 0 61px;width:400px;height:60px;background:#FF3355;font-size:22px;
font-family:PingFangSC-Semibold;
font-weight:600;color:#ffffff;" @click="next">下一步</el-button>
	    </div>

		<div :style="{ display: active==1?'flex':'none','flex-direction': 'column','justify-content': 'flex-start','align-items': 'center'}" class="form2">

		  <div style="margin:31px auto 56px;">
		    <span class="title">学员</span>
		  </div>
		  <el-form-item style="margin-left:-140px;">
			  <el-col :span="12">
			    <el-form-item label="在校人数">
			      <div class="allflexend" style="margin-right:33px;">
			        <el-input type="number" :min="0" v-model="form.in_school" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="12">
			    <el-form-item label="其中女性">
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.female" placeholder="请输入" style="width: 200px;"></el-input><span style="margin-left:9px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>

		  <div style="margin:25px auto 50px;">
		    <span style="font-size:20px;" class="title">在校学员情况</span>
		  </div>


		<div id="studentinfo">
		  <el-form-item style="margin-left:-70px;">
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">离休干部</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.in_school_cadre" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">退休干部</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.retire_cadre" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">退休职工</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.retire_worker" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">其他</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.other_worker" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>
			<el-form-item style="margin-left:-70px;">
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">80岁以上</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.higher_than_80" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">65-79岁</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.between_65_and_79" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">64-50岁</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.between_50_and_64" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">49岁以下</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.lower_than_49" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>

			<el-form-item style="margin-left:-70px;">
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">大专以上</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.junior_college" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">中学</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.middle_school" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">小学</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.primary_school" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="6">
			    <el-form-item style="margin-bottom:-10px;">
			    	<label style="width:124px;">其他</label>
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.other_education" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;margin-right:30px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>
			</div>

		  <div style="margin:65px auto 55px;">
		    <span class="title">教师</span>
		  </div>
		  <div style="width:713px;margin-left: -56px;">
		  	
			<el-form-item style="margin-left:-185px;margin-right: -27px;">
			  <el-col :span="12">
			    <el-form-item label="专职" label-width="185px">
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.sole" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="12">
			    <el-form-item label="其中高级职称" label-width="165px">
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.sole_senior_rank" placeholder="请输入" style="width: 200px;"></el-input><span style="margin-left:9px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>
			<el-form-item style="margin-left:-185px;margin-right: -27px;">
			  <el-col :span="12">
			    <el-form-item label="聘请" label-width="185px">
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.employ" placeholder="请输入" style="width: 180px;"></el-input><span style="margin-left:9px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="12">
			    <el-form-item label="其中高级职称" label-width="165px">
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.employ_senior_rank" placeholder="请输入" style="width: 200px;"></el-input><span style="margin-left:9px;">人</span>
			      </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>
		  <el-form-item label="师资主要来源">
		    <el-input v-model="form.source" placeholder="请输入"></el-input>
		  </el-form-item>
		  </div>

		  	<div style="margin:66px auto 56px;">
			  <span class="title">工作人员</span>
			</div>
			<el-form-item style="margin-left:-164px;">
			  <el-col :span="12">
			    <el-form-item label="在编">
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.regular_worker" placeholder="请输入" style="width: 200px;"></el-input><span style="margin-left:9px;">个</span>
			      </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="12">
			    <el-form-item label="聘用">
			      <div class="allflexend">
			        <el-input type="number" :min="0" v-model="form.employ_worker" placeholder="请输入" style="width: 200px;"></el-input><span style="margin-left:9px;">个</span>
			      </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>





		  	<div style="margin:66px auto 56px;">
			  <span class="title">校舍情况</span>
			</div>
			<el-form-item style="margin-left:-164px;">
			  <el-col :span="12">
			    <el-form-item label="固定面积">
			    <div class="allflexend">
			      <el-input v-model="form.fixed_area" type="number" :min="0" placeholder="请输入" style="width: 200px;"></el-input><span style="margin-left:9px;">m<sup>2</sup></span>
			    </div>
			    </el-form-item>
			  </el-col>
			  <el-col :span="12">
			    <el-form-item label="非固定面积">
			    <div class="allflexend">
			      <el-input v-model="form.not_fixed_area" type="number" :min="0" placeholder="请输入" style="width: 200px;"></el-input><span style="margin-left:9px;">m<sup>2</sup></span>
			    </div>
			    </el-form-item>
			  </el-col>
			</el-form-item>



		  <div style="margin:64px auto 58px;">
		    <span class="title">经费来源</span>
		  </div>
		  <div style="width:709px;">
		  <el-form-item label="每年政府拨款">
		  	<div class="allflexend">
		    	<el-input v-model="form.gov_appropriation" placeholder="请输入" type="number" :min="0"></el-input><span style="margin-left:9px;">万</span>
		  	</div>
		  </el-form-item>
		  <el-form-item label="每年学费收入">
		  	<div class="allflexend">
		    	<el-input v-model="form.tuition" placeholder="请输入" type="number" :min="0"></el-input><span style="margin-left:9px;">万</span>
		  	</div>
		  </el-form-item>

			<el-form-item label="一学期个人学费" style="margin-bottom:30px;width: 880px;margin-left: -14px;" label-width="154px">

	        <el-col :span="7.1">
	        	<div class="allflexend">
			    	<el-input v-model="form.person_highest_tuition" placeholder="请输入" style="width:180px;" type="number" :min="0"></el-input><span style="margin-left:9px;margin-right:17px;">最高(元)</span>
	        	</div>
			</el-col>
			<el-col :span="11.1">
			  <el-form-item>
			  <div class="allflexend">
			    <el-input v-model="form.person_lowest_tuition" placeholder="请输入" style="width:200px;" type="number" :min="0"></el-input><span style="margin-left:9px;">最低(元)</span>
			  </div>
			  </el-form-item>
			</el-col>
		  </el-form-item>

		  <el-form-item label="捐赠">
		  	<div class="allflexend">
		    <el-input v-model="form.donation" placeholder="请输入" type="number" :min="0"></el-input><span style="margin-left:9px;">元</span>
		  	</div>
		  </el-form-item>
		  <el-form-item label="其他收入">
		  	<div class="allflexend">
		    <el-input v-model="form.other_income" placeholder="请输入" type="number" :min="0"></el-input><span style="margin-left:9px;">元</span>
		  	</div>
		  </el-form-item>
		  <el-form-item label="来源">
		  	<div class="allflexend">
		    	<el-input v-model="form.other_income_source" placeholder="请输入其他收入来源"></el-input><span style="margin-left:27px;"></span>
		  	</div>
		  </el-form-item>
		  </div>
		  <div style="display:flex;justify-content:center;align-items:center;margin-top:70px;margin-bottom:60px;">
			  <el-button style="width:200px;height:60px;background:#FFFFFF;font-size:22px;font-family:PingFangSC-Semibold;font-weight:600;color:#FF3355;" @click="back">上一步</el-button>
		      <el-button style="width:200px;height:60px;background:#FF3355;font-size:22px;font-family:PingFangSC-Semibold;font-weight:600;color:#ffffff;margin-left:29px;" @click="onSubmit">提交</el-button>
		  </div>
		</div>

		</el-form>
    </div>
  </div>
</template>


<script>
    import Api from '@/api/loginApi';
	import {mapGetters,mapActions} from 'vuex';
	const md5 = require('md5');
	export default {
	  data() {
	  	var validemailpass =(rule,value,callback)=>{
	  		var email = value;
			var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			if(email === ''){
				callback(new Error("请输入邮箱"));
		  	}else if(!reg.test(email)){
				callback(new Error("邮箱格式不正确"));
		  	} else{
		  		callback();
		  	}
		  }
	      return {
	        isfalse: false,
	        active: 0,
	        form: {
	          name: '', //学校名称  
	          establish_time: '', //成立时间  
	          department: '', //主管部门  
	          property: '', //学校性质  
	          leader_system: '', //领导体制 
	          school_level: '', //学校级别  
	          address: '', //通讯地址 
	          office_telephone: '', //办公室电话 
	          dean_telephone: '', //教务处电话 
	          email: '', //电子邮箱 
	          website: '', //学校官网 
	          lead_array: [{ //领导资料
	            name: '',
	            gender: '',
	            birthday: '',
	            present_position: '', //在校职务
	            previous_position: '', //现（原）任职务
	            mobile: '' //手机
	          }, {
	            name: '',
	            gender: '',
	            birthday: '',
	            present_position: '',
	            previous_position: '',
	            mobile: ''
	          }],
	          institute: '', //学校内设机构 
	          journal: '', //校刊校报名称 
	          general_class: 0, //普通班数  
	          enhance_class: 0, //提高班数  
	          research_class: 0, //研究班数 
	          other_class: 0, //其他班数  
	          major: '', //专业设置 
	          main_lesson: '', //主要课程 
	          in_school: '', //学生在校人数
	          female: '', //学生女学员人数 
	          in_school_cadre: '', //在校职工人数
	          retire_cadre: '', //退校职工人数  
	          retire_worker: '', //退休职工人数 
	          other_worker: '', //其他职工人数  
	          higher_than_80: '', //学生长于80岁人数 
	          between_65_and_79: '', //学生65-79岁人数 
	          between_50_and_64: '', //学生50-64岁人数 
	          lower_than_49: '', //学生49岁以下人数  
	          junior_college: '', //学生大专学历以上人数  
	          middle_school: '', //学生中学学历人数 
	          primary_school: '', //学生小学学历人数  
	          other_education: '', //学生其他学历人数 
	          sole: '', //教师专职人数  
	          sole_senior_rank: '', //教师专职高级职称人数  
	          employ: '', //教师聘用人数  
	          employ_senior_rank: '', //教师聘用高级职称人数  
	          source: '', //教师师资来源  
	          regular_worker: '', //在编员工  
	          employ_worker: '', //聘用员工 
	          fixed_area: '', //固定面积  
	          not_fixed_area: '', //非固定面积 
	          gov_appropriation: '', //每年政府拨款(万)  
	          tuition: '', //每年学费总收入(万) 
	          person_highest_tuition: '', //最高学费(元)/人/学期  
	          person_lowest_tuition: '', //最低学费(元)/人/学期 
	          donation: '', //捐献金额  
	          other_income: '', //其他收入  
	          other_income_source: '' //其他收入来源  
	        },
	        rules: {
	          name: [{
	            required: true,
	            message: '请输入学校名称',
	            trigger: 'blur'
	          }],
	          email: [{
	            validator: validemailpass,
	            trigger: 'blur'
	          }]
	        }
	      }
	    },
	    props: [],
	    computed: {
	      ...mapGetters('Login', ['getuid', 'gettoken', 'getuserinfo'])
	    },
	    created: function() {
	      var arr = Object.keys(this.getuserinfo);
		    if (arr.length > 0) {
		        this.form = this.getuserinfo;
		    }
      		if (!this.getuid||!this.gettoken) {
	    		this.$router.push({path: '/login'});
	    	}
	    },
	    methods: {
	      onSubmit() {
	      	var that = this;
	        that.$refs['form'].validate((valid, errormsg) => {
	          if (valid) {
		      	if(that.form.in_school&&that.form.in_school_cadre&&that.form.lower_than_49&&that.form.sole&&that.form.fixed_area&&that.form.tuition){
					that.$set(that.form,'establish_time',that.filttime(that.form.establish_time));
					that.form.lead_array.forEach(function(item,index){
						that.$set(that.form.lead_array[index],'birthday',that.filttime(that.form.lead_array[index]['birthday']));
					});
		            var str = (Date.parse(new Date())) / 1000;
		            var sign = md5('uid=' + that.getuid + '&token=' + that.gettoken + '&timestamp=' + str);
		            var obj = Object.assign({
		              uid: that.getuid,
		              timestamp: str,
		              sign: sign
		            }, that.form);
		            that.$store.dispatch('Login/isetuserinfo', that.form);

		            Api.requestform(obj).then((data) => {
		              if (data.code == 0) {
		              	if(data.data){
		              		if((Object.keys(data.data)[0]=='lead_array')&&data.data.lead_array.length>=1){
		                		that.$message.error(data.data.lead_array[0][Object.keys(data.data.lead_array[0])[0]]);
		              		}else{
		                		that.$message.error(data.data[Object.keys(data.data)[0]]);
		              		}
		              	}else{
		                	that.$message.error(data.msg);
		              	}
		              } else if (data.code == 1) {
		                that.$router.push({
		                  path: '/applicasuc'
		                });
		              }
		            }).catch(function(error) {
		              console.log(error);
		            });
		      	}else{
		            that.$message.error('请补充完整信息后再提交');	      		
		      	}
	          } else {
	            that.$message.error(errormsg[Object.keys(errormsg)[0]][0].message);
	            return false;
	          }
	        });
	      },
	      // 增加行
	      addRow() {
	        var list = {
	          name: '',
	          gender: '',
	          birthday: '',
	          present_position: '',
	          previous_position: '',
	          mobile: ''
	        }
	        this.form.lead_array.unshift(list);
	      },
	      next() {
	      	if(this.form.lead_array[0].name&&this.form.lead_array[0].previous_position&&this.form.lead_array[0].mobile&&this.form.name&&this.form.property&&this.form.address&&this.form.email&&this.form.institute&&this.form.main_lesson){
		        if (this.active++ > 2) this.active = 0;
		        this.$store.dispatch('Login/isetuserinfo', this.form);
	      	}else{
	            this.$message.error('请补充完整信息后再进入下一步');	      		
	      	}
	      },
	      back() {
	        if (this.active-- < 0) this.active = 0;
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

  .title{
  	font-size:30px;
font-family:PingFangSC-Semibold;
font-weight:600;color:#333333;
  }
  	$pd-lf:padding-left;
	.allflexend{
		  	@include displayflex(flex-end,center,row,nowrap);
	}
  	.artstyle{
	  	width:1200px;
	  	background:#ffffff;
	  	margin:30px auto;
	  	@include displayflex(flex-start,center,column,nowrap);
	  	&>span{
	  		font-size:30px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:#333333;
			margin:45px auto 50px;
	  	}
  	}
</style>
<style lang="scss">
#requestuserinfo{
	
  @mixin font-style($family,$size,$color,$weight){
  	font-family: $family;
		font-size:$size;
		color:$color;
		font-weight:$weight;
  }
  //顶部步骤条的样式
  .el-step__head.is-process,.el-step__head.is-finish{
  	&>.el-step__icon{
	  	background:#FF3355;
	 }
	 .el-step__icon-inner{
	  	color:#FFFFFF;
	  }
  }
  .el-step__head.is-finish{
  	.el-step__line-inner{
  		border:1px dashed #FF3355;
  	}
  }
  .el-step__icon.is-text{
  	border:1px solid #FF3355;
  }
  .el-step.is-horizontal .el-step__line{
  	top:21px;
  }
  .el-step__icon{
  	width:40px;
  	height:40px;
  	font-size:20px;

	  .el-step__icon-inner{
	  	color:#FF3355;
	  }
  }
  .el-step__line{
  	background:transparent;

	  .el-step__line-inner{
	  	width:100%;
	  	border:1px dashed #CCCCCC;
	  }
  }
  //顶部步骤条的样式

  //label的样式
  .el-form-item__label{
  	font-size:18px;
	font-family:PingFangSC-Regular;
	color:#333333;
	padding:0 28px 0 0;
	line-height:60px;
  }
  //label的样式

  //输入框的样式
  .el-input__inner{
  	background:#FAFAFA;
  	border:1px solid #E6E6E6;
  	color:#333333;
  	height:60px;
	padding:0 8px 0 26px;
	font-size:18px;
  }
  //输入框的样式

//表单项目的样式
	.el-form-item {
		margin-bottom: 30px;
	}
	.el-form-item__content{
		font-size:18px;
		color:#333333;
		line-height:60px;
	}
//表单项目的样式

  //输入框内尾部图标的样式
	.el-input__suffix{
		right:30px;
	}
  //输入框内尾部图标的样式

//按钮的样式
	.el-button{
      border-color:#FF3355;
      &:active{
        border-color:#FF3355;
      }
      &:focus,&:hover{
        border-color:#FF3355;
      }
    }
    //按钮的样式

//复选框
	.el-radio__input.is-checked{
		&>.el-radio__inner {
		    border-color: #FF3355;
		    background: #FF3355;
		}
	} 
    .el-radio__input.is-checked+.el-radio__label{
    	color:#FF3355;
    }
     .el-radio__inner:hover{
     	border-color: #FF3355;
     }
//复选框

//表单背景
	.el-table .cell{
		padding-left:8px;
		padding-right:8px;
		font-size:18px;color:#333333;
	}
    .el-table td, .el-table th.is-leaf{
    	border-bottom:0;
    }
     .el-table::before{
     	background-color:#FFFFFF;
     }
//表单背景

}
//这是时间的样式
     .el-date-table td.today span {
	    color: #FF3355;
	}
	.el-date-table td.current:not(.disabled) span {
	    background-color:#FF3355;
	}
	.el-date-table td.available:hover {
	    color: #FF3355;
	}
//这是时间的样式
//下拉框
	.el-select{
		width:100%;
	}
    .el-select-dropdown__item.selected{
	    color: #FF3355!important;
	}
//下拉框
#studentinfo{
//在校学员情况的行高
	.el-form-item__content {
	    line-height: 36px;
	}
//在校学员情况的行高
}
</style>