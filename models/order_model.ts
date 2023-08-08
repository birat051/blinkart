import mongoose from "mongoose";
import  { Address } from "./address_model";
import { Product } from "./product_data_model";
import { UserModel } from "./user_model";
const { Schema,Model } = mongoose;

const orderSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
          price: {
            type: Number,
            required: true,
          },
          discount: {
            type: Number,
            required: true,
          }
        },
      ],
      shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'AddressModel',
        required: true,
    },
    deliveryFees: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    creditCardNumber: {
        type: String,
        default: null
    },
    deliveryStatus: {
        type: String,
        default: 'Ordered'
    }
});

export interface Order extends Document {
    _id: string;
    userId: UserModel['_id'];
    orderDate: Date;
    products: Array<{
      productId: Product['_id'];
      quantity: number;
      price: number;
      discount: number;
    }>;
    shippingAddress: Address['_id'];
    deliveryFees: number;
    paymentMethod: string;
    creditCardNumber: string | null;
    deliveryStatus: string;
}

export interface ProductOrder{
  productId: string,
  quantity: number,
  price: number,
  discount: number
}

const OrderModel: typeof Model<Order> =
  mongoose.models.order || mongoose.model<Order>("order", orderSchema);

export default OrderModel;

