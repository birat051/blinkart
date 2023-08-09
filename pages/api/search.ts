import ProductCategoryModel from '@/models/product_category_model';
import ProductDataModel from '@/models/product_data_model';
import connectToDatabase from '@/utils/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); 
  }
  const { term, limit } = req.query;
  try {
    await connectToDatabase()
    const [categoryResults, productResults] = await Promise.all([
        ProductCategoryModel.find({ name: { $regex: term, $options: 'i' } }).limit(Number(limit)),
        ProductDataModel.find({
        $or: [
          { name: { $regex: term, $options: 'i' } },
          { brand: { $regex: term, $options: 'i' } },
        ],
      }).limit(Number(limit)),
    ]);
    res.status(200).json({ categoryResults, productResults });
  } catch (error) {
    console.log('Caught error in search API: ',error)
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
}
