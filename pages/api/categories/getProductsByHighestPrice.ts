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
      console.log('Max price is: ',maxPrice)
      await connectToDatabase();
      const productsPerPage = 5;
      const skip = (parseInt(pageNumber.toString()) - 1) * productsPerPage;
      const filters: any = JSON.parse(includeOutofStock.toString())?{
        category: categoryId,
        price: { $lte: parseInt(maxPrice.toString()) },
      }:{
        category: categoryId,
        price: { $lte: parseInt(maxPrice.toString()) },
        quantity: {$gt: 0}
      };

      const products = await ProductDataModel.find(filters) // Sort by price in descending order (lowest to highest)
      .sort({ price: -1 }).skip(skip).limit(productsPerPage);

        const totalCount = await ProductDataModel.countDocuments(filters);
        console.log('Total count is: ',totalCount)
        const totalPages = Math.ceil(totalCount / productsPerPage);
        return res.status(200).json({ products, totalPages });
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ error: 'Unable to fetch products' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
