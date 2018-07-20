<template>
 	<div class="table-item">
		<ul>
			<li>
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
							<!-- <p>参赛作品：小白兔吃萝卜 <i></i></p> -->
							<p>手机:13933247272</p>
							<p>参赛宣言：冠军了解一下！冠军了解一下！参赛宣言：冠军了解一下！冠军了解一下！</p>
						</li>
						<li>
							<p>邮箱：123456789@qq.com</p>
							<p>点赞数：123456</p>
							<p>吸引流量：1123</p>
						</li>
					</ul>
				</div>
				<div class="icon">
					<el-select v-model="value" placeholder="请选择状态">
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
<script>
export default {
	props: {
		
		loading: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return { 
			options: [{
	          value: '选项1',
	          label: '黄金糕'
	        }, {
	          value: '选项2',
	          label: '双皮奶'
	        }, {
	          value: '选项3',
	          label: '蚵仔煎'
	        }, {
	          value: '选项4',
	          label: '龙须面'
	        }, {
	          value: '选项5',
	          label: '北京烤鸭'
	        }],
	        value: ''
		}
	},
	methods: {
		
	}
}
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.table-item {

	li {
		display: flex;
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
			margin-top: 8px;
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