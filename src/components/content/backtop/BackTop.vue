<template>
	<div class="back-top"> 
		<img src="@assets/img/common/top.png/" alt="">
	</div>
</template>

<script>

	export default {
		name: 'BackTop',
		props: [''],
		data () {
			return {

			};
		},

		components: {},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {
		
		},
		watch: {}
	}

</script>
<style scoped>
	.back-top {
		position: fixed;
		bottom: 56px;
		right: 8px;
		width: 40px;
		height: 40px;
		z-index: 10;
	}
	.back-top img {
		width: 40px;
		height: 40px;
		border-radius: 20px;

	}
</style>