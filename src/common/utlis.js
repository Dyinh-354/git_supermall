//一些公共的工具方法

// 防抖：在在一定时间内，只允许最后调用的一次生效，在本次调用后剩下的时间内不可以再调用，否则重启延时器，重新计时，事件不会执行
export function debounce(func, delay) {
	let timer = null;
	return function(...args) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay);
	}
}

// 节流是在一定时间内允许调用一定次数

// 时间格式化
export function formatDate(date, fmt) {
	// 1 获取年份
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) ;
	}
	// 2 获取月份事件
	let o = {
		'M+':date.getMonth() + 1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes(),
		's+':date.getSeconds(),
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}