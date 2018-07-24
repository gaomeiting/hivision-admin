<template>
<transition name="fade" mode="out-in">
	<error :error="error" v-if="error" :key="0"></error>
	<div v-else :key="1" class="page">
		<div class="title">
			<span class="sub-title">搜索</span>
		</div>
	 	<div class="title">
	 		<div class="search-wrap">
	 			<search-box v-for="i in 3" :key="i" :placeholder="i === 1 ? '姓名搜索' : i === 2 ? '手机号搜索' : '邮箱搜索'" @queryChange="queryChange(arguments, i)" ref="searchBox"></search-box>
	 		</div>
	 		<div class="select-wrap">
				<el-select v-model="form.status" placeholder="请选择" clearable>
			    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
	 		<span class="button" @click="search()">查询</span>
	 		<!-- <span class="button" @click="exportMsg()">导出</span> -->
	 	</div>
	 	<div class="title">
			<span class="sub-title">声咖列表</span>
		</div>
	 	<div class="table-wrap">
	 		<table-list :list="list" @selectBtn="selectBtn" @goDetail="goDetail"></table-list>
	 	</div>
	 	<div class="pagination-wrap" v-if="total">
	 		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="size"
		      layout="prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
	 	</div>
	</div>
</transition>
</template>
<script  type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box';
import TableList from 'base/table-list/table-list';
import Error from 'base/error/error';
import  { getCommon } from"common/js/mixin";
import { postData, getData, downData } from 'api/api';
export default {
	mixins: [getCommon],
	data() {
		return {
			
			error: '',
			total: 0,
			options: [{
	          value: '1',
	          label: '已报名未提交音频'
	        }, {
	          value: '2',
	          label: '音频待审核'
	        }, {
	          value: '3',
	          label: '音频审核不通过'
	        }, {
	          value: '4',
	          label: '海选通过'
	        }, {
	          value: '5',
	          label: '晋级八强'
	        }, {
	          value: '6',
	          label: '晋级四强'
	        }],
	        form: {
	        	email: '',
	        	mobile: '',
	        	realName: '',
	        	status: ''
	        },
	        address: ''
		}
	},
	created() {
		this.search()
	},
	methods: {
		goDetail(item) {
			this.$router.push(`/singer/${item.id}`)
		},
		exportMsg() {
			let {
				email,
				mobile,
				realName,
				status
			} = this.form;
			let url = `/api/contestant/export?email=${email}&mobile=${mobile}&realName=${realName}&status=${status}`
			console.log(this.address)
			downData(url).then(res => {
				this.download(res)
			}).catch(err => {
				if (err && err.data) {
					console.log(err)
					this.error = err.data.toString()
				} else {
					this.error = "接口调试报错"
				}
			})
		},
		download (data) {
	        if (!data) {
	            return
	        }
	        let url = window.URL.createObjectURL(new Blob([data]))
	        let link = document.createElement('a')
	        link.style.display = 'none'
	        link.href = url
	        link.setAttribute('download', 'excel.xlsx')

	        document.body.appendChild(link)
	        link.click()
	    },
		selectBtn(index, id) {
			if(index === 0) {
				this.sendEmail(id)
			}
			else if(index === 1) {
				this.sendSms(id)
			}
			else {
				this.$router.push(`/singer/${id}`)
			}
		},
		sendEmail(email) {
			postData('/api/send/email', { email }).then(res => {
				this.$message({
		            type: 'success',
		            message: '发送成功!'
		        });
			}).catch(err => {
				if(err && err.data) {
					this.error = err.data;
				}
				else {
					this.error = "接口调试中请等候"
				}
			})
		},
		sendSms(mobile) {
			postData('/api/send/sms', { mobile }).then(res => {
				this.$message({
		            type: 'success',
		            message: '发送成功!'
		        });
			}).catch(err => {
				if(err && err.data) {
					this.error = err.data;
				}
				else {
					this.error = "接口调试中请等候"
				}
			})
		},

	},
	components: {
		TableList,
		SearchBox,
		Error
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";

.table-wrap {
	background: #fff;
	padding: 0 10px;
	margin: 0 auto;
	box-sizing: border-box;
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
	.search-wrap {
		display: flex;
		align-items: center;
		padding-left: 26px;
	}
	> span {
		flex:1;
		&.sub-title {
			text-indent: 26px;
		}
	}
	.select-wrap {
		margin: 0 10px;
	}
	.button {
		flex: 0 0 100px;
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
		cursor: pointer;
	}
}
.pagination-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #fff;
	margin: 0 auto;
	padding: 16px 0;
}
</style>