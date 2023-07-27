import AddressModel, { Address } from "@/models/address_model";
import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    if (req.method === 'DELETE') 
    {
    try{
      await connectToDatabase();
      const { addressId } = req.query;
      if (!addressId) {
        return res.status(400).json({ error: 'Address ID is required in the request' });
      }
      const deletedAddress: Address | null = await AddressModel.findByIdAndDelete(addressId);
      // Check if the address was found and deleted
      if (!deletedAddress) {
        return res.status(404).json({ error: 'Address not found' });
      }
      res.status(200).json(deletedAddress);
    }
    catch(error)
    {
        console.error('Error deleting address:', error);
        res.status(500).json({ error: 'Unable to delete address' });
    }
    }
    else
    {
        res.status(405).json({ error: 'Method not allowed' }); 
    }
}