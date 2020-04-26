<template>
	<div id="app" >
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>

export default {
  	name: 'app',
	data() {
          return {
		  }
	},
	mounted:function(){

	},
	created:function(){

	},
	methods:{

	},
	components: {

	}
}
</script>

<style scoped>
#app {
	position: relative;
	height: 100%;
}
</style>
<style lang="scss">
@import './assets/css/main.scss';
</style>
