<template>
	<div>
		<header class="indexHead">
			<el-select class="choiceItem" v-model="value" placeholder="请选择">
				<el-option 
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
			<router-link to="/search">
				<el-input class="search"
					placeholder="请输入内容"
					prefix-icon="el-icon-search"
					v-model="input1">
				</el-input>
			</router-link>
			<div class="scan">
				<img src="../../img/icons/scan.png"/>
			</div>
		</header>
		<div class="block">
		  <el-carousel trigger="click" height="150px">
			<el-carousel-item v-for="item in sliders" :key="item.id">
				<a>
					<img :src="item.src" class="sliderImg"/>
					<p class="slider-title">{{item.title}}</p>
				</a>
			  <h3>{{ item }}</h3>
			</el-carousel-item>
		  </el-carousel>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
	  name: 'index',
	  data () {
	    return {
		  options: [{
			  value: '选项1',
			  label: '黄金糕',
		    },{
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
			value:"",
			input1:"",
			sliders:[{
				id:1,
				src:"http://www.jyzhpt.com/MAPLX/static/smartcity_html/smartcity_app/img/a2.jpg",
				title:"中国梦1"
			},{
				id:2,
				src:"http://www.jyzhpt.com/MAPLX/static/smartcity_html/smartcity_app/img/a2.jpg",
				title:"中国梦2"
			},{
				id:3,
				src:"http://www.jyzhpt.com/MAPLX/static/smartcity_html/smartcity_app/img/a2.jpg",
				title:"中国梦3"
			}]
	    }
	  }
	}
</script>
<style>
	[v-cloak] {display: none;}
	/* 重写element-ui.css */
	.el-input__inner{
		border: none;
		background: none;
	}
	.el-carousel__button{
		width: 13px;
	}
	.el-carousel__indicators{
		transform: none;
		right: 0px;
		left: inherit;
	}
	/* 重写结束 */
	.indexHead{
		display: flex;
		padding: 0px;
		background: #0095f7;
	}
	.choiceItem{
		width: 100px;
		margin-bottom: 0px;
		width: 110px;
	}
	.search{
		flex: 3;
	}
	.scan{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.sliderImg{
		width: 100%;
	}
</style>