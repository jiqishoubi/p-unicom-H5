const api = {
	getOrderCountApi: '/getOrder/usergetOrderCount', //获取订单数量
	getOrderListApi: '/getOrder/user/list', //获取订单列表
	getOrderListCrmApi: '/getOrder/company/list', //获取订单列表--crm
	getOrderDetailApi: '/getOrder/singgleOrder', //订单详情
	getLogisticsDetailApi: '/mp/express/queryForMP', //物流信息
	//
	cancelOrderApi: '/order/userRequestCallback', //取消订单
	successOrderApi: '/order/userconfirm', //完成订单 
}

export default api
