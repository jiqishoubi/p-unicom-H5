const api = {
	//我的企业
	getMyTeamListApi: '/team/getTeamList', //我的企业列表
	cutTeamApi: '/team/getTeamInfo', //切换
	//创建企业
	getTeamTypeListApi: '/team/getTeamType', //企业所属行业列表
	createTeamApi: '/team/addTeam', //创建企业
	isPhoneWhiteApi: '/team/queryCreateWhitelistByPhone', //是否是白名单

	joinTeamApi: '/user/joinTeam', //加入团队

	//crm
	getTeamSaleRankApi: '/mp/team/teamUserSaleRank', //团队销售排行
	getTeamSaleRankSubApi: '/mp/team/UserSaleRankDetail', //团队销售排行 我的分销
	getCrmRoleListMyApi: '/mp/role/getUserRoles', //获取我的角色
	getSelectRoleListApi: '/mp/role/queryRoles', //获取可以选择的角色
	associateRoleApi: '/mp/role/associateRole', //切换角色
}

export default api
