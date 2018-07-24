<template>
<transition name="fade" transition-mode="out-in">
	<div class="form">
	 	<el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm" :on-exceed="handleExceed"
  :file-list="fileList" class="demo-ruleForm">
			<el-form-item label="作品名称"  prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="作品简介"  prop="info">
			    <el-input type="textarea" v-model="ruleForm.info"></el-input>
			</el-form-item>
	 		<el-form-item label="上传音频文件"  prop="story">
				<el-upload
				  class="upload-demo"
				  action="/api/media/voice"
				  :on-success="handleAvatarSuccess"
  				  :before-upload="beforeAvatarUpload">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传.mp3文件</div>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</transition>
</template>
<script>
import { postData } from 'api/api';
export default {
    data() {
      return {
		fileList:[],
      	
        ruleForm: {
        	name: '',
        	info: '',
          	story: ''
        },
        rules: {
			name: [
			{ required: true, message: '请选择故事名称', trigger: 'blur' },
			{ min: 1, max: 20, message: '长度在 20 个字符以内', trigger: 'blur' }
			],
			info: [
			{ required: true, message: '请选择故事名称', trigger: 'blur' },
			{ min: 1, max: 400, message: '长度在 400 个字符以内', trigger: 'blur' }
			],
	        story: [
	        	{ required: true, message: '请上传故事音频', trigger: 'blur' }
	        ]
        }
      };
    },

methods: {
	handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
	handleAvatarSuccess(res, file) {
	    this.imageUrl = URL.createObjectURL(file.raw);
	    this.ruleForm.story = file.response.url;
	    console.log('handleAvatarSuccess', this.ruleForm)
	},
	beforeAvatarUpload(file) {
		console.log(file)
	    const isMp3 = file.type === 'audio/mp3';
	    const isLt10M = file.size / 1024 / 1024 < 10;

	    if (!isMp3) {
	      this.$message.error('上传文件只能是 mp3 格式!');
	    }
	    if (!isLt10M) {
	      this.$message.error('上传文件大小不能超过 10MB!');
	    }
	    return isMp3 && isLt10M;
	},
    createdNew(res) {
		this.$router.push('/addTeacher');
	},
	remoteMethod(query) {
		console.log("remote")
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let arr = this.options.teacher.slice(0,-1);
      		let res = [];
			res = arr.filter(item => {
              return item.label.indexOf(query) > -1;
            });
            this.options.teacher = [...res, {}]
          }, 200);
        } else {
          this.options.teacher = this.options.teacherInit;
        }
    },
	submitForm(formName) {
		const id = this.$route.params.id;
		///contestant/{id}/voice
		this.$refs[formName].validate((valid) => {
		  if (valid) {
		  	let title = this.ruleForm.name
		  	let desc = this.ruleForm.info
		  	let url = this.ruleForm.story
		  	postData(`/api/contestant/${id}/voice`, {
		  		title,
		  		desc,
		  		url
		  	}).then(res => {
		  		this.$message({
		            type: 'success',
		            message: '上传音频成功!'
		        });
		        this.$emit('hide')
		  	}).catch(err => {
		  		if(err && err.data) {
		  			this.error = `${err.data.status}${err.data.error}`
		  		}
		  		else {
		  			this.error = '接口调试中请稍等'
		  		}
		  	})
		  } else {
		    console.log('error submit!!');
		    return false;
		  }
		})
	},
	resetForm(formName) {
		this.$refs[formName].resetFields();
	},
	_normalizeData(list) {
		let arr = [];
		list.forEach(item => {
			let obj = {}
			obj.value = item.id
			obj.label = item.name || item.title
			arr.push(obj)
		})
		return arr;
	}
}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.form {
	width: 400px;
	background: #fff;
	padding: 30px 30px 30px 0;
	margin: 0 auto;
}


</style>