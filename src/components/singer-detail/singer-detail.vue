<template>
<transition name="fade" mode="out-in">
	<error v-if="error" :error="error" :key="0"></error>
	<div v-else :key="1" class="page">
		<div class="title">
			<span class="sub-title">参赛声咖详情</span>
		</div>
		<div class="table-wrap" v-if="details">
			<table-item :item="details" @changeStatus="changeStatus"></table-item>
		</div>
		<!-- <div class="title">
			<a href="javascript:;" style="margin-left: 80px;" class="button" @click="toggleUpload">上传音频</a>
		</div> -->
		<transition name="slideDown" mode="out-in">
			<div class="upload-wrap">
				<upload-story v-if="isUpload" key="0" @hide="hide"></upload-story>
			</div>
		</transition>
		<div class="title" style="margin-top: 20px;" v-if="text">
			<span class="sub-title">比赛动态</span>
		</div>
		<ul class="text" v-if="text">
			<li>2018-7-19   海选通过。</li>
			<li>2018-8-20   进入复赛阶段。</li>
		</ul>
	</div>
</transition>
</template>
<script type="text/ecmascript-6">
import Error from 'base/error/error';
import TableItem from 'base/table-item/table-item';
import UploadStory from 'base/upload-story/upload-story';
import { postData, getData, putData } from 'api/api';
export default {
	data() {
		return {
			error: '',
			isUpload: false,
			details: {},
			text: false
		}
	},
	created() {
		let id = this.$route.params.id;
		this._getSingerData(id)
	},
	methods: {
		changeStatus(val) {
			let id = this.$route.params.id;
			putData(`/api/contestant/${id}`, {status: val}).then(res => {
				this.$message({
		            type: 'success',
		            message: '修改成功!'
		        });
			}).catch(err => {
				if(err && err.data) {
					this.error= `${err.data.status}${err.data.error}`;
				}
				else {
					this.error = '接口调试中请等待'
				}
			})
		},
		hide() {
			console.log('hide')
			if(this.isUpload) this.isUpload = false
		},
		toggleUpload() {
			this.isUpload = !this.isUpload;
		},
		_getSingerData(id) {
			getData(`/api/contestant/${id}`).then(res => {
				this.details = res;
			}).catch(err => {
				if(err && err.data) {
					this.error = err.data.toString()
				}
				else {
					this.error = '接口调试中请等待'
				}
			})
		}
	},
	components: {
		TableItem,
		Error,
		UploadStory
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.upload-wrap, .text {
	background: $color-background-d;
	border-bottom: 1px dashed $color-background;
}
.text {
	line-height: 2;
	padding: 20px 26px;
}
.table-wrap {
	background: #fff;
	padding: 0 10px;
	margin: 0 auto;
	box-sizing: border-box;
	padding-left: 20px;
	
}
.title {
	display: flex;
	height: 40px;
	line-height: 40px;
	background: #fff;
	font-size: 18px;
	color: $color-text-d;
	border-bottom: 1px dashed $color-background;
	padding: 10px 0;
	align-items: center;
	> span {
		flex:1;
		&.sub-title {
			text-indent: 26px;
		}
	}
}
.button {
	width: 100px;
	text-align: center;
	line-height: 34px;
	height: 34px;
	color: #fff;
	border-radius: 20px;
	background: #e6a23c;
	font-size: 14px;
	margin-right: 20px;
	margin-top: 4px;
}
</style>