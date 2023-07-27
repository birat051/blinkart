import mongoose from "mongoose";
const { Schema,Model } = mongoose;


const addressSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    default: {
        type: Boolean,
        default: false,
    },
    addressType: {
        type: String,
        required: true
    },
    locality: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      required:true
    }
  });

export interface Address extends Document {
    userId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    default: boolean;
    _id: string;
    addressType: string;
    name: string;
    locality: string;
    mobileNumber: string
}

const AddressModel: typeof Model<Address> =
  mongoose.models.address || mongoose.model<Address>("address", addressSchema);

export default AddressModel;

