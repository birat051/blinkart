import connectToDatabase from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import ProductDataModel from "@/models/product_data_model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { categoryId,pageNumber, maxPrice, includeOutofStock } = req.query;
    if(!pageNumber)
    return res.status(400).json({ error: 'Page number is required in request' });
    if(!categoryId)
    return res.status(400).json({ error: 'Category id is required in request' });
    if(!maxPrice)
    return res.status(400).json({ error: 'Max price value is required in request' })
    if(!includeOutofStock)
    return res.status(400).json({ error: 'Include out of stock option is required in request' })
    try {
      await connectToDatabase();
      const productsPerPage = 5;
      const skip = (parseInt(pageNumber.toString()) - 1) * productsPerPage;
      
      const filters: any = JSON.parse(includeOutofStock.toString())?{
        category: categoryId,
        price: { $lte: maxPrice },
      }:{
        category: categoryId,
        price: { $lte: maxPrice },
        quantity: {$gt: 0}
      };

      const products = await ProductDataModel.find(filters)
        .sort({ price: 1 }) // Sort by price in ascending order (lowest to highest)
        .skip(skip)
        .limit(productsPerPage);

      return res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ error: 'Unable to fetch products' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
