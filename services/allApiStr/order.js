const api = {
	getProductInfoApi: '/app/queryProductInfo',
	submitOrderApi: '/app/tradeSubmit',
	getOrderListApi: '/app/queryTradeListByNo',
	cancelApi: '/app/updateTradeStatus', //取消订单

	//支付
	goPayApi: '/api/wx/pay/mweb',
	getPayStatusApi: '/api/wx/pay/query',
	refundApi: '/api/wx/pay/refund', //申请退款
}

export default api
