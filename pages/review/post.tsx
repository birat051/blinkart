import ProductDataModel, { Product } from '@/models/product_data_model'
import ReviewDataModel from '@/models/product_review_model'
import { ErrorContainer } from '@/styles/globals.style'
import connectToDatabase from '@/utils/connectDB'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

type PostReviewProp=
{
    error?:string;
    product: Product;
    averageRating: number;
    numberOfReviews: number;
}


function PostReview(props:PostReviewProp) {
  if(props.error)
  return(
    <ErrorContainer>
        <p>{props.error}</p>
    </ErrorContainer>  
  )
  return (
    <div>PostReview</div>
  )
}

export default PostReview

export async function getServerSideProps(context: GetServerSidePropsContext)
{
    const {query} = context
    if(!query.productId)
    return {
        redirect: {
          destination: '/',
          permanent: false,
        },
    };
    try{
        await connectToDatabase()
        const product=await ProductDataModel.findById(query.productId)
        if (!product) {
            return {
              props: {
                error: 'Product not found',
              },
            };
        }
        const reviews = await ReviewDataModel.find({ product: product._id });
        let averageRating = 0;
        if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        averageRating = totalRating / reviews.length;
        }

    return {
        props: {
            product:JSON.parse(JSON.stringify(product)),
            numberOfReviews: reviews.length,
            averageRating : averageRating
        }
    }
    }
    catch(error)
    {
        return {
            props: {
                error: (error as Error).toString()
            }
        }
    }
}