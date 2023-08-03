import AddressModel from "@/models/address_model";
import OrderModel, { ProductOrder } from "@/models/order_model";
import ProductDataModel, { Product } from "@/models/product_data_model";
import connectToDatabase from "@/utils/connectDB";
import { NextApiResponse } from "next";

export interface CreateOrderResponse{
    result: boolean,
    message?: string,
    body?: Product
}

export default class OrderServices{
    static createOrder=async (userId: string,
    products: ProductOrder[],
    shippingAddress: string,
    deliveryFees: number,
    paymentMethod: string,
    creditCardNumber: string | null,
    )=>{
        const body={
            userId,
            products,
            shippingAddress,
            deliveryFees,
            paymentMethod,
            creditCardNumber,
        }
        try{
            const response = await fetch('/api/order/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              });
          console.log('Response is: ',response.body)
          if(response.status===201)
          {
            const body= await response.json()

            const result:CreateOrderResponse={
                result:true,
                body: body
            }
            return result
          }
          else
          {
            const errorData = await response.json();
            const result:CreateOrderResponse={
                result:false,
                message: errorData
            }
            return result
          }
        }
        catch(error){
            const result:CreateOrderResponse={
                result:true,
                message: 'Unexpected error occured: '+error
            }
            return result
        }
    }

    static getOrderDetails=async (orderId:string)=>{
        try{
        await connectToDatabase();
        const order=await OrderModel.findById(orderId);
        const address= await AddressModel.findById(order.shippingAddress)
        const products: Product[] = await Promise.all(
            order.products.map(async (product: ProductOrder) => {
              const data = await ProductDataModel.findById(product.productId);
              return JSON.parse(JSON.stringify(data));
            })
          );
        return {
            order: JSON.parse(JSON.stringify(order)),
            address: JSON.parse(JSON.stringify(address)),
            products: products
        }
    }
    catch(error)
    {
        return {
            error: error
        }
    }
    }
}