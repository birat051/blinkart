import AddressModel, { Address } from "@/models/address_model";
import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if(req.method==='PUT')
    {
        try{
            await connectToDatabase()
            const { addressId } = req.query;
            if (!addressId) {
                return res.status(400).json({ error: 'Address ID is required in the request' });
            }
            const {
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
              }: Address = req.body;
              const updatedAddress: Address | null = await AddressModel.findByIdAndUpdate(
                addressId,
                {
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
                },
                { new: true } // Set this option to get the updated address as the response
              );
              if (!updatedAddress) {
                return res.status(404).json({ error: 'Address not found' });
              }
              res.status(200).json(updatedAddress);
        }
        catch(error)
        {
            res.status(500).json(error)
        }
    }
    else
    res.status(405).json('Method not allowed')
}