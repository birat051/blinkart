import mongoose from "mongoose";

export interface UserModel extends Document {
    email: string;
    password: string;
    name: string;
}

const userSchema= new mongoose.Schema({
    email: {type: String,unique: true},
    password: {type: String},
    name: {type: String}
})


export default mongoose.models.users || mongoose.model<UserModel>('users', userSchema);
