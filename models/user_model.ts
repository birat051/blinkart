import mongoose from "mongoose";
const { Schema,Model } = mongoose;

export interface UserModel extends Document {
    email: string;
    password: string;
    name: string;
    _id: string;
    mobileNumber: string | null;
}

const userSchema= new Schema({
    email: {type: String,unique: true},
    password: {type: String},
    name: {type: String},
    mobileNumber: {type:String,default: null}
})

const UserDataModel: typeof Model<UserModel> =
mongoose.models.users || mongoose.model<UserModel>("users", userSchema);

export default UserDataModel
