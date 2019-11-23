// 将自主封装的axios请求方法，再度封装成每个页面适用的模块（深度解耦）
// 每个页面中也有很多的请求要求，将这些请求方法都封装在这一个模块中，那么对应页面的
// 1 将自己封装的axios请求方法引入本模块
// 2 再度封装
import {request} from "./request"

export function getHomeMultidata() {
	return request({
		url: '/home/multidata'
	})
}
// es6的模块引入：import {getHomeMultidata} from 'network/home'

export function getHomeGoods(type, page) {
	return request({
		url: '/home/data',
		params: {
			type,
			page
		}
	})
}