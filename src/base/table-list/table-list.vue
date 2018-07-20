<template>
 	<div class="table-list" ref="tableList">
		<ul>
			<li v-for="(item, index) in 3">
				<div class="img">
					<img src="https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=09d2a547a8c27d1eba263dc42bd7adaf/3812b31bb051f8195bf514a9d6b44aed2f73e705.jpg">
				</div>
				<div class="content">
					<ul>
						<li>
							<p>张小平</p>
							<p>昵称：太阳叔叔</p>
							<p>简介：冠军了解一下！冠军了解一下！</p>
						</li>
						<li>
							<p>41254789962145****</p>
							<p>参赛作品：小白兔吃萝卜 <i></i></p>
							<p>参赛宣言：冠军了解一下！冠军了解一下！参赛宣言：冠军了解一下！冠军了解一下！</p>
						</li>
						<li>
							<p>等级状态：已报名提交音频</p>
							<p>点赞数：123456</p>
							<p>吸引流量：1123</p>
						</li>
					</ul>
				</div>
				<div class="icon">
					<a href="javascript:;" class="button">发邮件</a>
					<a href="javascript:;" class="button">发短信</a>
					<a href="javascript:;" class="button">改状态</a>
					<!-- <a href="javascript:;" class="button">上传音频</a> -->
				</div>
			</li>

		</ul>
		<div class="no-result-wrap" v-if="!list.length && !loading">
			<no-result title="没有结果"></no-result>
		</div>
 	</div>
</template>
<script>
import NoResult from 'base/no-result/no-result';
export default {
	props: {
		type: {
			type: String,
			default: 'singer'
		},
		list: {
			type: Array,
			default() {
				return []
			}
		},
		loading: {
			type: Boolean,
			default: true
		},
		options: {
			type: Array,
			default() {
				return [{
			          value: '0',
			          label: '待联系'
			        }, {
			          value: '1',
			          label: '已确认'
			        }, {
			          value: '2',
			          label: '已取消'
			        }]
			}
		},
		playCls: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return { 
			flag: false,
			currentIndex: -1,
			value: []
		}
	},
	methods: {
		
	},
	components: {
		NoResult
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.no-result-wrap {
	padding-top: 200px;
}
.table-list {
	li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid $color-background;
		padding: 20px 0;
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
					padding: 0;
					p {
						line-height: 2;
						padding-right: 1em;
					}
				}
			}

		}
		.icon {
			padding-left: 16px;
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
				margin-right: 20px;
				margin-top: 4px;
			}
		}
	}
}
</style>