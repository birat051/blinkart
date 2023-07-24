import mongoose from "mongoose";
const { Schema,Model } = mongoose;


export interface ReviewModel extends Document
{
    _id: string
    user: string,
    product: string,
    rating: number,
    comment: string,
    createdAt: Date;
    updatedAt: Date;
    title: string
}


const reviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    title: {type: String,required: true}
    // Add other review-related fields as needed
  }, { timestamps: true });

const ReviewDataModel: typeof Model<ReviewModel> =
mongoose.models.review || mongoose.model<ReviewModel>("review", reviewSchema);

export default ReviewDataModel;