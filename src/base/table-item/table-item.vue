<template>
 	<div class="table-item">
		<ul v-if="item">
			<li>
				<div class="img">
					<img :src="item.avatar">
				</div>
				<div class="content">
					<ul>
						<li>
							<p>{{item.realname}} <i></i></p>
							<p>昵称：{{item.nickname}}</p>
							<p>简介：{{item.title}}</p>
						</li>
						<li>
							<p>{{item.idCard}}</p>
							<!-- <p>参赛作品：小白兔吃萝卜 <i></i></p> -->
							<p>手机:{{item.mobile}}</p>
							<p>参赛宣言：{{item.slogan}}</p>
						</li>
						<li>
							<p>邮箱：{{item.email}}</p>
							<p v-if="item.likeNum">点赞数：{{item.likeNum}}</p>
							<!-- <p>吸引流量：1123</p> -->
						</li>
					</ul>
				</div>
				<div class="icon">
					<el-select v-model="value" :placeholder="toggleStatus(this.item.status) || '请选择状态'" @change="changeOption">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</div>
			</li>

		</ul>
 	</div>
</template>
<script type="text/ecmascript-6">

import  { changeStatus } from 'common/js/mixin';
export default {
	mixins: [changeStatus],
	props: {
		item: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return { 
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
	        value: '',
	        placeholder: '请选择状态'
		}
	},
	created() {
		//if(this.item) this.placeholder = this.toggleStatus(this.item.status);
	},
	methods: {
		changeOption(val) {
			this.$emit('changeStatus', val)
		}
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.table-item {

	> ul {
		li {
			padding: 10px 20px;
		}
	}
	li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid $color-background;
		&:hover {
		    cursor: pointer;
		}
		.img {
			flex: 0 0 50px;
			width: 50px;
			height: 50px;
			overflow: hidden;
			border-radius: 25px;
			margin-right: 10px;
			img {
				width: 100%;
				min-height: 100%;
			}
		}
		.content {
			flex: 1;
			ul {
				display: flex;
				li {
					display: block;
					border-bottom: none;
					p {
						line-height: 2;
						padding-right: 1em;
					}
				}
			}

		}
		.icon {
			.button {
				display: block;
				width: 100px;
				text-align: center;
				line-height: 34px;
				height: 34px;
				color: #fff;
				border-radius: 20px;
				background: #e6a23c;
				font-size: 14px;
				margin-top: 4px;
			}
		}
	}
}
</style>