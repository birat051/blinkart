import AddressModel, { Address } from "@/models/address_model";
import OrderModel, { Order, ProductOrder } from "@/models/order_model";
import ProductDataModel, { Product } from "@/models/product_data_model";
import connectToDatabase from "@/utils/connectDB";

export interface CreateOrderResponse{
    result: boolean,
    message?: string,
    body?: Order
}

export interface ProductDetails extends ProductOrder{
    imageUrl: string;
    name: string;
    brand: string;
}

export interface OrderDetailsResponse
{
    orderId: string,
    address: Address,
    orderStatus: string,
    products: ProductDetails[]
}


export default class OrderServices{
    static getOrderDetails=async (orderId:string)=>{
        try{
        await connectToDatabase();
        const order=await OrderModel.findById(orderId);
        const address= await AddressModel.findById(order.shippingAddress)
        const products: ProductDetails[] = await Promise.all(
            order.products.map(async (product: ProductOrder) => {
              const data = await ProductDataModel.findById(product.productId);
              return  {
                productId: JSON.parse(JSON.stringify(product)).productId,
                quantity: product.quantity,
                price: product.price,
                discount: product.discount,
                imageUrl: data.imageUrls[0],
                name: data.name,
                brand: data.brand
              }
            })
        );
        // console.log('Got products: ',products)
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
    static getAllOrders=async (pageNumber:number,limit:number,userId:string)=>
    {
        try{
            await connectToDatabase()
            const orders = await OrderModel.find({userId: userId}).sort({ orderDate: -1 })
            .skip((pageNumber - 1) * limit)
            .limit(limit);
            // console.log('Got orders: ',orders)
            const formattedOrders:OrderDetailsResponse[] = await Promise.all(
                JSON.parse(JSON.stringify(orders)).map(async (order:Order) => {
                  const address = await AddressModel.findById(order.shippingAddress);
                  const products: ProductDetails[] = await Promise.all(
                    order.products.map(async (product: ProductOrder) => {
                      const data = await ProductDataModel.findById(product.productId);
                      const imageUrl=data.imageUrls[0]
                      return {
                        productId: product.productId,
                        quantity: product.quantity,
                        price: product.price,
                        discount: product.discount,
                        imageUrl: imageUrl,
                        name: data.name,
                        brand: data.brand
                      };
                    })
                  );
          
                  return {
                    orderId: order._id.toString(),
                    address: JSON.parse(JSON.stringify(address)),
                    orderStatus: order.deliveryStatus,
                    products: products,
                  };
                })
              );
              return formattedOrders;
        }
        catch(error)
        {
            console.log('Caught exception while fetching all orders: ',error)
           return {
            error: error
            } 
        }
    }
}