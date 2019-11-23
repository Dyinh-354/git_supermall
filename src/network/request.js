// 书写一个axios的网络请求方法
// 1 在当前项目的目录下使用你npm指令安装这个插件：npm install axios --save
// 2 引入
// 3 创建一个方法将axios封装在内
import axios from 'axios'

// export function request(config, success, failure) {
// 	// 1 创建axios实例
// 	const instance = axios.create({
// 		baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
// 	})
// 	// 2 调用这个实例，发送真正的网络请求,将返回的数据或者错误信息，传入到形参函数中
// 	instance(config)
// 		.then(res => {
// 			console.log(res);
// 			success(res)
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			failure(err)
// 		})
// }
// 调用时传参
// request({

// }, success() {

// }, failure() {

// })

// // 改进：将success函数个failure函数封装在一个config对象中
// export function request(config) {
// 	// 1 创建axios实例
// 	const instance = axios.create({
// 		baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
// 	})
// 	// 2 调用这个实例，发送真正的网络请求,将返回的数据或者错误信息，传入到形参函数中
// 	instance(config.baseConfig)
// 		.then(res => {
// 			// console.log(res);
// 			config.success(res)
// 		})
// 		.catch(err => {
// 			// console.log(err);
// 			config.failure(err)
// 		})
// }
// // 调用时传参
// request({
// 	baseConfig: {

// 	},
// 	success() {

// 	},
// 	failure() {

// 	}
// })

// 改进使用promise函数
// export function request(config) {
// 	return new promise((resolve,reject) => {
// 			// 1 创建axios实例
// 		const instance = axios.create({
// 			baseURL: 'http://123.207.32.32:8000',
// 			timeout: 5000
// 		})

// 		// 2 调用这个实例，发送真正的网络请求,将返回的数据或者错误信息，传入到形参函数中
// 		instance(config)
// 			.then(res => {
// 				// console.log(res);
// 				// config.success(res)
// 				resolve(res)
// 			})
// 			.catch(err => {
// 				// console.log(err);
// 				// config.failure(err)
// 				reject(err)
// 			})
// 	})
// }

// 改进终极版
// export function request(config) {
// 			// 1 创建axios实例
// 	const instance = axios.create({
// 		baseURL: 'http://123.207.32.32:8000',
// 		timeout: 5000
// 	})
// 	// 3 调用这个实例，发送真正的网络请求,将返回的数据或者错误信息，传入到形参函数中
// 	// 在调用instence函数的时候，本身的返回值就是一个promise函数，那么可以在调用request函数的时候，
// 	// 直接调用promise函数的.then()和.catch()方法
// 	return instance(config)
// }   
// 调用这个方法
// request({
// 	url: '/home/mutidata'
// }).then(res => {
// 	console.log(res);
// }).catch(err => {
// 	console.log(err);
// })

// 在axios的封装函数中添加请求拦截，和响应拦截器
export function request(config) {
	// 1 创建axios实例
	const instance = axios.create({
		// baseURL: 'http://123.207.32.32:8000/api/v1/home/data?type=sell&page1',
		baseURL: 'http://123.207.32.32:8000/api/v1',

		timeout: 5000
	})

	// 2 axios的拦截器，全局的拦截器:axios.interceptors.request.use();/axios.interceptors.reponse.use()
	// 在这个封装函数的拦截器：
	
	// 请求拦截
	instance.interceptors.request.use(config => {
		// console.log(config);
		// 这里是请求发送阶段的请求拦截，此时被拦截的数据是前端向服务器发送请求时携带的数据
		// 这是发送成功后，才会被拦截下来，进入到这里，因此，拦截后，要将数据 返回！！！
		// 否则会进入请求会进入失败，无法返回服务器返回的响应数据

		// 这个拦截的目的主要是，在这里将请求中的一些我们活着服务器不需要的数据剔除，进行js逻辑处理这些数据后，再选择继续发送
		// 1 比如说 不符合服务器要求的信息
		// 2 比如每次发送网络请求的时候.都希望在界面中显示一个请求的图标
		// 3 某些网络情趣(比如登录(token)),必须要携带一些特殊的信息
		return config
	}, err => {
		console.log(err);
	})

	// 响应拦截
		// res中包括请求返回来的很多数据，包括axios自动给添加的数据
		// 而真正由服务器返回来的有效数据，都放在data属性中，一般只使用res.data即可
		// console.log(res);
		// 因为服务器返回的响应数据在这里被拦截了，因此在这个成功函数的最后，要间被处理过的，或者没处理的响应数据返回
		// return res
		// or
	instance.interceptors.response.use(res => {
		return res.data
		// 这里从服务器返回的数据再从拦截器处理后返回的数据，会自动传入到success函数中
	}, err => {
		console.log(err);
	})
	// 3 调用这个实例，发送真正的网络请求,将返回的数据或者错误信息，传入到形参函数中
	// 在调用instence函数的时候，本身的返回值就是一个promise函数，那么可以在调用request函数的时候，
	// 直接调用promise函数的.then()和.catch()方法
	return instance(config)
} 

// 每个单页面的请求方法，再单独建立一个网络请求模块





