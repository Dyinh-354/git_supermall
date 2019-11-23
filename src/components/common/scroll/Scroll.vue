<template>
	<div class="wrapper" ref="wrapper" >
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		name: 'Scroll',
		props: {
			probeType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				scroll: null
			};
		},

		components: {},
		computed: {},
		beforeMount() {},
		mounted() {
			// document.querySelector():在vue中不适合使用document.querySelector来获取元素，因为绑定该类名的元素在全局组件中可能不止一个
			// 在vue中一般给子组件中对应元素绑定一个ref属性，使用this.$refs.refname获取对应的组件获得元素
			// 1 创建一个BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			console.log(this.scroll);
			// 2 调用这个对象，监听滚动的位置:先判断probeType的值，是否需要执行监听滚动事件
			if (this.probeType === 2 || this.probeType === 3) {
				this.scroll.on('scroll', (position) => {
					// console.log(position)
					this.$emit('scrollposition', position)
				})
			}
			
			// this.scroll.scrollerHeight:当前可滚动区域
			// this.scroll.refresh()可计算出html和图片全部渲染完成后的可滚动区域的高度
			// this.scroll.refresh()

			// 3 监听上拉加载事件：先判断pullUpLoad的值，是否需要上拉刷新，如果需要才执行
			if (this.pullUpLoad) {
				this.scroll.on('pullingUp', () => {
					// console.log('上拉加载更多111')
					this.$emit('pullingUp')
				})
			}
		},
		methods: {
			scrollTo(x, y, time=200) {
				// this.scroll.scrollTo(x, y, time)
				this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
				// this.scroll.scrollTo(x, y, time)

			},
			// 自己封装一个结束上拉加载的方法,this.scroll.finishPullUp()是BScroll插件自带的方法
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
			},
			// 自行封装一个图片加载完成后的监听函数
			refresh() {
				// 在此处验证，scroll的底层refresh函数被执行了几次
				// console.log('refresh------')
				this.scroll && this.scroll.refresh && this.scroll.refresh()
			},
			getScrollY() {
				return this.scroll ? this.scroll.y : 0
			}

		},
		watch: {}
	}

</script>
<style lang='' scoped>

</style>