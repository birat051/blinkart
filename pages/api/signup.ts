// import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/user_model';
import connectToDatabase from "@/utils/connectDB";

// async function connectToDatabase() {
//     try {
//       const dbLink = process.env.DB_LINK;
  
//       if (!dbLink) {
//         throw new Error('DB_LINK environment variable is not set.');
//       }
  
//       await mongoose.connect(dbLink, {
//       });
  
//       console.log('Connected to MongoDB!');
//     } catch (error) {
//       console.error('MongoDB connection error:', error);
//     }
// }

  // Call the connectToDatabase function to establish the MongoDB connection
connectToDatabase();

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
    
      const { email, password, name } = req.body;
    try{
        const existinguser= await User.findOne({ email })
        if(existinguser)
        {
            return res.status(409).json({message: 'User with this email id already exists'})
        }

        const newUser= await User.create({email,password,name})

        return res.status(201).json({ message: 'User created successfully', userId: newUser._id });

    }
    catch(e)
    {
        return res.status(500).json({ message: 'Internal Server Error: ', e });
    }

}