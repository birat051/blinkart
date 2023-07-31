import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import ProductDataModel from "@/models/product_data_model";




export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if (req.method==='GET')
    {   
        const { productId } = req.query;
        try{
            await connectToDatabase()
            
            const product=ProductDataModel.findById(productId)
            res.status(200).json(product)
        }
        catch(error)
        {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Unable to fetch product' + productId});
        }
    }
    else{
        res.status(405).json({ error: 'Method not allowed' });
    }
}