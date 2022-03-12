//当前模块，API进行统一管理，即对请求接口统一管理
import requests from "@/api/request";
import mockRequest from './mockRequest'

//首页三级分类接口
export const reqCateGoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'GET'
    })
}
//获取bunner接口
export const reqGetBannerList = () => {
    return mockRequest({
        url: '/banner'
    })
}
//获取floor接口
export const reqGetFloorList = () => {
    return mockRequest({
        url: '/floor'
    })
}
//URL:/api/list   method:post    参数：需要携带
//这个接口【携带参数：最多十个，十个属性可以传递，也可以不传递，但是至少给给服务器携带一个空对象】
//获取search数据
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}
//获取detail数据
export const reqGetDetailList = (skuid) => {
    return requests({
        url: `/item/${ skuid }`,
        method: 'get'
    })
}
//向购物车写入数据
export const reqGetAddToCart = (skuId, skuNum) => {
    return requests({
        url: `cart/addToCart/${skuId}/${skuNum}`,
        method: 'post'
    })
}
//获取购物车列表数据
export const getShopCart = () => {
    return requests({
        url: 'cart/cartList',
        method: 'get'
    })
}
//修改购物车物品数量
export const reqShopNum = (skuId, skuNum) => {
    return requests({
        url: `cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
        data: {
            skuId,
            skuNum
        }
    })
}
//删除购物车的物品
export const reqDeleteShop = (skuId) => {
    return requests({
        url: `cart/deleteCart/${skuId}`,
        method: "delete"
    })
}
//修改产品的状态 
export const reqChangeState = (skuID, isChecked) => {
    return requests({
        url: `cart/checkCart/${skuID}/${isChecked}`,
        method: 'get'
    })
}

//获取验证码
export const reqGetCode = (phone) => {
    return requests({
        url: `user/passport/sendCode/${phone}`,
        method: 'get'
    })
}
//注册请求
export const reqRegister = (phone, code, password) => {
    return requests({
        url: `user/passport/register`,
        method: 'post',
        data: {
            phone,
            code,
            password
        }
    })
}
//登录请求
export const reqLogin = (data) => {
    return requests({
        url: `/user/passport/login`,
        method: 'post',
        data
    })
}
//获取userInfo信息
export const reqUserInfo = () => {
    return requests({
        url: `user/passport/auth/getUserInfo`,
        method: 'get'
    })
}
//退出登录 user/passport/logout
export const reqLogOut = () => {
    return requests({
        url: `user/passport/logout`,
        method: 'get'
    })
}
//获取地址信息
export const reqAddressList = () => {
    return requests({
        url: "user/userAddress/auth/findUserAddressList",
        method: "get"
    })
}
//order/auth/trade //获取交易页数据
export const reqTradeList = () => {
    return requests({
        url: "order/auth/trade",
        method: 'get'
    })
}
//提交订单 order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
}
//获取支付信息/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}
//获取支付状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}
//获取订单列表order/auth/{page}/{limit}
export const reqOrderDetail = (page, limit) => {
    return requests({
        url: `order/auth/${page}/${limit}`,
        method: 'get'
    })
}