import ReviewDataModel, { ReviewModel } from "@/models/product_review_model";
import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = await getToken({ req })
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if(req.method!=='POST')
    {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const {productId,userId}=req.query
    if(!productId)
    return res.status(400).json({ error: 'Product id is required in request' });
    if(!userId)
    return res.status(400).json({ error: 'User id is required in request' });
    try{
        await connectToDatabase()
        const{
            title,
            comment,
            rating
        }=req.body
        const review:ReviewModel=await ReviewDataModel.create({
            title,
            comment,
            rating,
            product:productId,
            user: userId
        })
        res.status(201).json(review)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({ error: 'Unexpected error ocurred while processing the request' });
    }
}