<template>
 	<div class="table-list" ref="tableList">
		<ul>
			<li v-for="(item, index) in list" @click.stop="goDetail(item)">
				<div class="img">
					<img :src="item.avatar">
				</div>
				<div class="content">
					<ul>
						<li>
							<p>{{item.realName}}</p>
							<p>昵称：{{item.nickname}}</p>
							<p>简介：{{item.title}}</p>
						</li>
						<li>
							<p>{{item.idCard}}</p>
							<p v-if="item.entryWork">参赛作品：{{item.entryWork.voiceTitle || '暂无作品'}} <i></i></p>
							<p>参赛宣言：{{item.slogan}}</p>
						</li>
						<li>
							<p>等级状态：{{ toggleStatus(item.status) }}</p>
							<p v-if="item.likeNum">点赞数：{{item.likeNum}}</p>
							<!-- <p>吸引流量：1123</p> -->
						</li>
					</ul>
				</div>
				<div class="icon" v-if="item.entryWork && item.entryWork.voiceUrl">
					<a href="javascript:;" class="button" @click.stop="selectBtn(0, item.email)">发邮件</a>
					<a href="javascript:;" class="button" @click.stop="selectBtn(1, item.mobile)">发短信</a>
					<a href="javascript:;" class="button" @click.stop="selectBtn(2, item.id)">改状态</a>
				</div>
				<div v-else class="icon">
					<a href="javascript:;" class="button" @click.stop="selectBtn(3, item.id)">上传音频</a>
				</div>
			</li>

		</ul>
		<div class="no-result-wrap" v-if="!list.length">
			<no-result title="没有结果"></no-result>
		</div>
 	</div>
</template>
<script>
import NoResult from 'base/no-result/no-result';
import  { changeStatus } from 'common/js/mixin';
export default {
	mixins: [changeStatus],
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
		goDetail(item) {
			this.$emit('goDetail', item)
		},
		selectBtn(index, id) {
			this.$emit('selectBtn', index, id)
		}
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
	padding: 200px 0;
}
.table-list {
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