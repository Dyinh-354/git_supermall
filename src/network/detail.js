import {request} from './request';

export function getDetail(iid) {
	return request({
		url: '/detail',
		params: {
			iid
		}
	})
}

// 创建一个类，在类的构造器中传入每一个返回数据的大的对象，再细分
export class Goods {
	constructor(itemInfo, columns, services) {
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
	}
}

//获得商铺的数据
export class Shop {
	constructor(shopInfo) {
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans;
		this.sells = shopInfo.cSells;
		this.score = shopInfo.score;
		this.goodsCount = shopInfo.cGoods
	}
}

// 获得参数信息
export class GoodsParam {
	constructor(paramInfo, paramRule) {
		this.sizes = paramRule.tables;
		this.infos = paramInfo.set;
		this.image = paramInfo.images ?  this.infos.images[0] : '';
	}
}

//请求推荐数据
export function getRecommend() {
	return request({
		url: './recommend'
	})
}