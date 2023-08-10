import AddressModel from '@/models/address_model';
import OrderModel, { Order, ProductOrder } from '@/models/order_model';
import ProductDataModel from '@/models/product_data_model';
import { OrderDetailsResponse, ProductDetails } from '@/services/orderServices';
import connectToDatabase from '@/utils/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
if(req.method==='GET')
{
  try {
    await connectToDatabase();
    const { pageNumber, limit, userId } = req.query;
    if(!pageNumber)
    {
        res.status(400).json('Page number is missing from query');
    }
    if(!limit)
    {
        res.status(400).json('Limit is missing from query');
    }
    if(!userId)
    {
        res.status(400).json('User id is missing from query');
    }
    // console.log('User id is: ',userId)
    const orders: Order[] = await OrderModel.find({ userId: userId }).find({userId: userId}).sort({ orderDate: -1 })
      .skip((Number(pageNumber) - 1) * Number(limit))
      .limit(Number(limit));
    // console.log('Number of records skipped: ',pageNumber-1)
    // console.log('Got orders: ',orders)
    const formattedOrders: OrderDetailsResponse[] = await Promise.all(
      orders.map(async (order: Order) => {
        const address = await AddressModel.findById(order.shippingAddress);
        const products: ProductDetails[] = await Promise.all(
          order.products.map(async (product: ProductOrder) => {
            const data = await ProductDataModel.findById(product.productId);
            const imageUrl = data.imageUrls[0];
            return {
              productId: product.productId,
              quantity: product.quantity,
              price: product.price,
              discount: product.discount,
              imageUrl: imageUrl,
              name: data.name,
              brand: data.brand,
            };
          })
        );

        return {
          orderId: order._id.toString(),
          address: JSON.parse(JSON.stringify(address)),
          orderStatus: order.deliveryStatus,
          products: products,
        };
      })
    );

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.log('Caught exception while fetching all orders: ', error);
    res.status(500).json({ error: error });
  }
}
else{
    res.status(405).json('Method not allowed');
}
}
