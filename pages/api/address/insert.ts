import AddressModel, { Address } from "@/models/address_model";
import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if (req.method==='POST')
    {
        try{
            await connectToDatabase()
            const{
                userId,
                street,
                city,
                state,
                postalCode,
                default: isDefault,
                addressType,
                name,
                locality,
                mobileNumber
            }:Address=req.body
            const newAddress: Address = await AddressModel.create({
                userId,
                street,
                city,
                state,
                postalCode,
                default: isDefault,
                addressType,
                name,
                locality,
                mobileNumber
              });
            res.status(201).json(newAddress)
        }
        catch(error)
        {
            console.error('Error inserting address:', error);
            res.status(500).json({ error: 'Unable to insert address' });
        }
    }
    else{
        res.status(405).json({ error: 'Method not allowed' });
    }
}