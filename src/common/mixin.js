//一些公共混用的工具方法
import { debounce } from './utlis.js'

import BackTop from '@components/content/backtop/BackTop.vue'



// 创建一个混入对象，本质还是一个对象，然后将这个对象导出，
// 在组件中使用mixins属性可以将这个对象中的内容插入到组件中
export const itemImgListenerMixin = {

	// 把相同的变量也提取出来
	data() {
		return {
			itemImgListener: null,
			refresh: null
		}
	},
	mounted() {
			this.refresh = debounce(this.$refs.scroll.refresh, 500)
			
			this.itemImgListener = () => {
				this.refresh()
			}
			this.$bus.$on('itemImageLoad', this.itemImgListener)
			// console.log('这是混入的内容')
	},
	// 除此之外还有很多的组件中的方法都可以使用这样的方法提取出来
	// 例如:
	// components: {},
	// methods: {}
}

// 2 backtop组件的混入


export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0, 0)
		},
		listenerBackTop(position) {
			this.isShowBackTop = (-position.y) > 1000	
		}
	}
}