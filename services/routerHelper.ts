export default class RouteHelper{
    static getProductRoute=(productId:string)=>{
        return `products/?iD=${productId}`
    }
    static getOrderConfirmationRoute=(orderId:string | undefined)=>{
        return `/orderconfirmation/?orderId=${orderId}`
    }
    static getCategoryRoute=(categoryId:string,pageNumber:string)=>{
        return `/categories/${categoryId}/${pageNumber}`
    }
}