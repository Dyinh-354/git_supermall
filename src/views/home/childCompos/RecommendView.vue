<template>
	<div class="recommend">
		<div class="recommend-item" v-for="(item, itemIndex) in recommends" :key="itemIndex">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'RecommendView',
		props: {
			recommends: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data () {
			return {

			};
		},

		components: {},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {},
		watch: {}
	}

</script>
<style scoped>
	.recommend {
		display: flex;
		width: 100%;
		text-align: center;
		font-size: 14px;
		
		padding: 10px 0 20px;
		border-bottom: 10px solid #eee;
	}
	.recommend-item {
		flex: 1;
	}
	.recommend-item a {
		text-decoration:none;
		color: black;
	}
	.recommend-item img {
		width: 80px;
		height: 80px;
		margin-bottom: 10px;
	}

</style>