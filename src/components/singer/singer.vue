<template>
<transition name="fade" mode="out-in">
	<error v-if="flag" :key="0"></error>
	<div v-else :key="1" class="page">
		<div class="title">
			<span class="sub-title">搜索</span>
		</div>
	 	<div class="title">
	 		<div class="search-wrap">
	 			<search-box v-for="i in 3" :key="i" :placeholder="i === 1 ? '姓名搜索' : i === 2 ? '手机号搜索' : '邮箱搜索'" @queryChange="queryChange(arguments, i)" ref="searchBox"></search-box>
	 		</div>
	 		<div class="select-wrap">
				<el-select v-model="value" placeholder="请选择">
			    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
	 		<span class="button" @click="goAdd('/addSinger')">导出</span>
	 	</div>
	 	<div class="title">
			<span class="sub-title">声咖列表</span>
		</div>
	 	<div class="table-wrap">
	 		<table-list></table-list>
	 	</div>
	 	<div class="pagination-wrap">
	 		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-size="currentSize"
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
/*import {getSingers, deleteSinger} from 'api/singers';*/
export default {
	mixins: [getCommon],
	data() {
		return {
			currentSize: 6,
			flag: false,
			options: [{
	          value: '选项1',
	          label: '已报名未提交音频'
	        }, {
	          value: '选项2',
	          label: '音频待审核'
	        }, {
	          value: '选项3',
	          label: '音频审核不通过'
	        }, {
	          value: '选项4',
	          label: '海选通过'
	        }, {
	          value: '选项5',
	          label: '晋级八强'
	        }, {
	          value: '选项6',
	          label: '晋级四强'
	        }],
	        value: ''
		}
	},
	created() {
		console.log()
	},
	methods: {
		queryChange(arg, i) {
			console.log(...arg, i)
		}
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