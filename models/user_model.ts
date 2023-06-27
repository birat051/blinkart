import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    email: {type: String,unique: true},
    password: {type: String},
    name: {type: String}
})

export default mongoose.models.users || mongoose.model('users', userSchema);
