import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import OrderModel,{Order} from "@/models/order_model";
import ProductDataModel from "@/models/product_data_model";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if (req.method==='POST')
    {
        try{
            await connectToDatabase()
            const{
                userId,
                products,
                shippingAddress,
                deliveryFees,
                paymentMethod,
                creditCardNumber,
            }:Order=req.body
            const insufficientQuantity = await Promise.all(
                products.map(async (product) => {
                    const productDetails = await ProductDataModel.findOne({ _id: product.productId });
                    if (productDetails && productDetails.quantity < product.quantity) {
                        return productDetails.name;
                    } else {
                        return null; 
                    }
                })
            );
            
            const validInsufficientProducts = insufficientQuantity.filter(name => name !== null);
            console.log('Insufficent quantity is: ',validInsufficientProducts)
            if(validInsufficientProducts.length>0)
            {
                console.log('Insufficient quantity')
                res.status(400).json({ error: 'Some products might be out of stock or doesn\`t have the sufficient quantity specified' })
                return
            }
            const newOrder: Order = await OrderModel.create({
                userId,
                products,
                shippingAddress,
                deliveryFees,
                paymentMethod,
                creditCardNumber,
            });
            await Promise.all(
                products.map(async (product) => {
                    await ProductDataModel.findOneAndUpdate(
                        { _id: product.productId },
                        { $inc: { quantity: -product.quantity } }
                    );
                })
            );
            res.status(201).json(newOrder)
        }
        catch(error)
        {
            console.error('Error create order:', error);
            res.status(500).json({ error: 'Unable to create order' });
        }
    }
    else{
        res.status(405).json({ error: 'Method not allowed' });
    }
}