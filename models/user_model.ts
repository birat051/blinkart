import mongoose from "mongoose";
const { Schema,Model } = mongoose;

export interface UserModel extends Document {
    email: string;
    password: string;
    name: string;
    _id: string;
}

const userSchema= new Schema({
    email: {type: String,unique: true},
    password: {type: String},
    name: {type: String}
})

const UserDataModel: typeof Model<UserModel> =
mongoose.models.users || mongoose.model<UserModel>("users", userSchema);

export default UserDataModel
