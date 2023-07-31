import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import OrderModel,{Order} from "@/models/order_model";

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
            const newOrder: Order = await OrderModel.create({
                userId,
                products,
                shippingAddress,
                deliveryFees,
                paymentMethod,
                creditCardNumber,
              });
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