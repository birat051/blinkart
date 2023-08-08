export default class RouteHelper{
    static getProductRoute=(productId:string)=>{
        return `/products/${productId}`
    }
    static getOrderConfirmationRoute=(orderId:string | undefined)=>{
        return `/orderconfirmation/?orderId=${orderId}`
    }
    static getCategoryRoute=(categoryId:string,pageNumber:string)=>{
        return `/categories/${categoryId}/${pageNumber}`
    }
    static getOrderRoute=()=>{
        return '/account/orders'
    }
    static getOrderDetailsRoute=(orderId:string)=>{
        return `/orderdetails?orderId=${orderId}`
    }
}