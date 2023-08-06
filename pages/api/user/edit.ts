import UserDataModel, { UserModel } from "@/models/user_model";
import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest,res: NextApiResponse) {
    if(req.method==='PUT')
    {
        try{
            await connectToDatabase()
            const { userId } = req.query;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required in the request' });
            }
            console.log('User id')
            const {
                email,
                name,
                mobileNumber
            } =req.body
            console.log('Email is: ',email)
            console.log('Got data: ',email,' ',name,' ',mobileNumber)
            const updatedUser=await UserDataModel.findByIdAndUpdate(userId,{
                email,
                name,
                mobileNumber
            },{new: true})
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        }
        catch(error)
        {
            console.log('Error is: ',error)
            res.status(500).json('Unexpected error occured: '+error)
        }
    }
    else
    res.status(405).json('Method not allowed')
}