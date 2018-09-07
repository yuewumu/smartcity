<template>
	<div>
		<header class="searchHead">
			<el-input class="search"
				type="search"
				placeholder="请输入内容"
				prefix-icon="el-icon-search"
				v-model="input21">
			</el-input>
			<div class="cancel">取消</div>
		</header>
		<div class="content">
			<div class="noSearched">
				<div class="historyNone">
					<div class="searchTip">搜索您感兴趣的内容</div> 
					<div class="classifySearch">
						<div>
							<img alt="" src="../../img/icons/information.png">
							<span>资讯</span>
						</div>
						<div>
							<img alt="" src="../../img/icons/pictures.png">
							<span>图集</span>
						</div> 
						<div>
							<img alt="" src="../../img/icons/video.png">
							<span>视频</span>
						</div>
					</div>
				</div> 
				<div class="recentHot"></div>
			</div>
		</div>
	</div>
</template>
<script>
	
</script>
<style>
	/* element 样式覆盖 */
	.searchHead{
		display:flex;
		background: #0095f7;
	}
	.el-input__inner{
		background: none;
		border: none;
	}
	/* element覆盖结束 */
	.search{
		flex:3;
		margin-left: 20px;
	}
	.cancel{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.historyNone{
		margin-bottom: 50px;
	}
	.searchTip {
		text-align: center;
		font-size: 20px;
		font-weight: 700;
		height: 50px;
		line-height: 50px;
		position: relative;
	}
	.classifySearch {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 25px;
	}
	.searchTip:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 50px;
		right: 50px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.classifySearch > div {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.classifySearch > div > img {
		margin-bottom: 10px;
	}
</style>