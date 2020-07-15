const api = {
	getHomeBannerApi:'/bannerManage/queryBannerListForMP', //首页banner动态
	//产品
	getGoodsTypeApi: '/goodstype/get/typeList',
	getGoodsApi: '/product/get/products', //获取产品列表
	getGoodsApi2: '/mp/product/query', //新的查商品的接口
	getGoodsApi3: '/mp/product/queryProductSubTypeView', //第三个版本的 查商品的接口 //用在产品列表 二级分类
	//详情页
	getCanUseTicketsApi: '/ticket/queryMyValidNormalTicket', //获取可用的优惠券 (普通)
	getCanUseTicketsPreApi: '/ticket/queryMyValidTicket', //获取可用的优惠券 (认筹)
	getEwmDetailsApi: '/qCode/smallCode', //生成商品详情的二维码
	getShareProductApi: '/product/shareProduct', //分享商品生产的海报
	//settle
	amountCalcApi: '/order/amountCalc', //计算金额
	amountCalcTicketApi: '/order/amountCalcTicket', //购买认筹券 计算金额
	addOrderApi: '/order/add', //下订单
	addOrderTicketApi: '/order/addOrderTicket', //下订单 购买认筹券
	payH5Api: '/order/pay/h5', //h5支付
	payFailApi:'/order/updateWechatState', //h5支付失败时调用
	//地址
	getAddressListApi: '/address/list', //获取地址list
	getAddressInfoApi: '/address/single', //查询address详情 
	addAddressApi: '/address/add', //新增地址
	modifyAddressApi: '/address/modify', //修改地址
	//优惠券相关
	getCouponListApi: '/ticket/queryPage', //获取优惠券list
	//首页优惠券
	getHomePageTicketsApi: '/ticketConfig/queryHomePageConfig', //获取首页可领优惠券
	receiveHomeTicketApi: '/ticket/grantTicket', //领取首页优惠券
	//优惠券相关 end

	//crm激活码劵
	activeTicketApi: '/ticket/activeSendTicket',
	giveTingsApi: '/ticket/send', //赠送东西
}

export default api
