<template>
	<div id="hy-swiper">
		<div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
			<slot></slot>
		</div>
		<slot name="indicator"></slot>
		<div class="indicator">
			<slot name="indicator" v-if="showIndicator && slideCount">
				<div v-for="(item, index) in slideCount" class="indi-item" 
						:class="{active: index === currentIndex-1}" :key="index"></div>
			</slot>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'Swiper',
		props: {
			interval: {
				type: Number,
				default: 3000
			},
			animDuration: {
				type: Number,
				default: 0.25
			},
			moveRatio: {
				type: Number,
				default: 0.25
			},
			showIndicator: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				slideCount: 0,//元素个数
				totalWidth: 0,//swiper的宽度
				swiperStyle: {},//swiper样式
				currentIndex: 1,//当前的index
				scrolling: false//当前是否正在滚动
				// interval: 100
			}
		},
		created() {
			this.startTimer();
		},
		mounted() {
			// 安装、初始化
			// 1 操作dom，在前后添加slide
			// this.handleDom();
			setTimeout(() => {
				this.handleDom();
				
				// 2 开启当前定时器
				this.startTimer();
			}, this.interval)
		},
		methods: {
			// 定时器操作

			// 开启定时器的方法
			startTimer() {
				this.playTimer = window.setInterval(() => {
					this.currentIndex++;
					this.scrollContent(-this.currentIndex * this.totalWidth);
				}, 2000)
			},
			// 关闭定时器的方法
			stopTimer() {
				window.clearInterval(this.playTimer);
			},

			// 图片滚动到预定的宽度的位置时的操作
			// 使当前这一张的图片滚动的方法
			scrollContent(currentPosition) {
				// 0 设置正在滚动（使当前图片开始滚动）
				this.scrolling = true;
			
				// 1 开始滚动动画
				this.swiperStyle.transition = 'transform ' + this.animDuation + 'ma';
				this.setTransform(currentPosition);
				
				// 2 判断滚动到的位置
				this.checkPosition();

				// 3 滚动完成（当前图片停止滚动（并开启下一张图片的滚动））
				this.scrolling = false;
			},

			// 校验正确的位置
			checkPosition() {
				window.setTimeout(() => {
					// 1 校验正确的位置
					this.swiperStyle.transition = '0ms';
					if (this.currentIndex >= this.slideCount + 1) {
						this.currentIndex = 1;
						this.setTransform(-this.currentIndex * this.totalWidth);
					} else if (this.currentIndex <= 0) {
						this.currentIndex = this.slideCount;
						this.setTransform(-this.currentIndex * this.totalWidth);
					}
					// 2 结束移动后的回调
					this.$emit('transitionEnd', this.currentIndex - 1);
				}, this.animDuration)
			},

			// 设置滚动的位置
			setTransform(position) {
				this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
				this.swiperStyle['-webkit-transform'] = `translate3d(${position}px, 0, 0)`;
				this.swiperStyle['-ms-transform'] = `translate3d(${position}px, 0, 0)`;
			},

			// 操作DOM，在DOM前后添加Slide
			handleDom() {
				// 1 获取要操作的元素
				let swiperE1 = document.querySelector('.swiper');
				let slidesEls = swiperE1.getElementsByClassName('slide');

				// 2 保存个数
				this.slideCount = slidesEls.length;

				// 3 如果大于1个，那么在前后分别添加一个slide
				if (this.slideCount > 1) {
					let cloneFirst = slidesEls[0].cloneNode(true);
					let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
					swiperE1.insertBefore(cloneLast, slidesEls[0]);
					swiperE1.appendChild(cloneFirst);
					this.totalWidth = swiperE1.offsetWidth;
					this.swiperStyle = swiperE1.style;
				}
				
				// 4 让swiper元素，显示第一个（目前是显示前面添加的最后一个元素）
				this.setTransform(-this.totalWidth);
			},

			// 拖动事件的处理
			touchStart(e) {
				// 1 如果正在滚动，不可以拖动
				if (this.scrolling) return;

				// 2 如果没有在滚动，则先(赶紧趁停止的空档)停止定时器
				this.stopTimer();

				// 3 保存开始滚动的位置
				this.startX = e.touches[0].pageX;
			},

			touchMove(e) {
				// 1 计算出用户拖动的距离
				this.currentX = e.touches[0].pageX;
				this.distance = this.currentX - this.startX;
				let currentPosition = -this.currentIndex * this.totalWidth;
				let moveDistance = this.distance + currentPosition;

				// 2 设置当时位置
				this.setTransform(moveDistance);
			},

			touchEnd(e) {
				// 1 获取移动的距离
				let currentMove = Math.abs(this.distance);

				// 2 判断最终的距离
				if (this.distance === 0) {
					// 直接返回停止执行，不让它继续移动，也不能让他继续执行之后的代码
					return 
				} else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
					// 右边移动超过0.5，让当前页减一，保持原图，不让跳到下一页
					this.currentIndex--;
				} else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
					// 左边移动超过0.5，让当前页加一，保持原图，不让跳到下一页
					this.currentIndex++;
				}

				// 3 移动到正确的位置
				this.scrollContent(-this.currentIndex * this.totalWidth);

				// 4 移动完成后，重新开启定时器
				this.startTimer();
			},

			// 控制上一个，下一个
			previous() {
				this.changeItem(-1);
			},

			next() {
				this.changeItem(1);
			},

			changeItem(num) {
				// 1 移除定时器
				this.stopTimer();

				// 2 修改index和位置
				this.currentIndex += num;
				this.scrollContent(- this.currentIndex * this.totalWidth);

				// 3 添加定时器
				this.startTimer();
			}
		}
	}

</script>

<style scoped>
	#hy-swiper {
		overflow: hidden;
		position: relative;
	}

	.swiper {
		display: flex;
	}

	.indicator {
		display: flex;
		justify-content: center;
		position: absolute;
		width: 100%;
		bottom: 8px;
	}

	.indi-item {
		box-sizing: border-box;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background-color: #fff;
		line-height: 8px;
		text-align: center;
		font-size: 12px;
		margin: 0 5px;
	}

	.indi-item.active {
		background-color: rgba(212, 62, 46, 1.0);
	}
</style>