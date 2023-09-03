import ProductDataModel, { Product } from '@/models/product_data_model'
import ReviewDataModel from '@/models/product_review_model'
import { CartContainer } from '@/styles/cart.style'
import { ErrorContainer } from '@/styles/globals.style'
import { PostReviewContainer, PostReviewForm, RatingsContainer, RatingsDisplay, ReviewFormDivider, StarRatingContainer } from '@/styles/postreview.styles'
import connectToDatabase from '@/utils/connectDB'
import { GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faS, faStar } from '@fortawesome/free-solid-svg-icons'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { CustomUser } from '@/components/AddressForm'
import { useRouter } from 'next/router'
import RouteHelper from '@/services/routerHelper'

type PostReviewProp=
{
    error?:string;
    product: Product;
    averageRating: number;
    numberOfReviews: number;
}

const ReviewDetails=z.object({
  rating: z.number(),
  description: z.string().min(20),
  title: z.string().min(3)
}).refine((data) => data.rating>0, {
  message: "Provide a rating",
  path: ["rating"]
});


function PostReview(props:PostReviewProp) {
  const router=useRouter()
  const [hoveredRating, setHoveredRating] = useState(0);
  const {data:session}=useSession()
  const handleRating = (value:number) => {
    ratingField.onChange(value)
  };
  const handleMouseEnter = (value:number) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };
  const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(ReviewDetails)})
  const { field: ratingField } = useController({
    name: 'rating',
    control,
    defaultValue: 0
  });
  const {errors}=formState
  const onFormSubmit=async (formValues:Record<string,any>)=>{
    const data={
      title: formValues.title,
      comment: formValues.description,
      rating: ratingField.value
    }
    try{
      const response = await fetch(`/api/review/create?productId=${props.product._id}&userId=${(session?.user as CustomUser)?.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    const responseData=await response.json()
    if(response.status===201)
    {
      alert('Thank you for the honest review')
      router.push(RouteHelper.getOrderRoute())
    }
    else
    alert(responseData.error);
  }
  catch(error){
      alert('Unexpected error occured while trying to create new offer')
  }
  }
  if(props.error)
  return(
    <ErrorContainer>
        <p>{props.error}</p>
    </ErrorContainer>  
  )
  return (
    <PostReviewContainer>
      <RatingsContainer>
      <h1>Ratings & Reviews</h1>
      <RatingsDisplay>
        <div>
          <h2>{props.product.name}</h2>
          {props.averageRating>0 && <p><span>{props.averageRating}&nbsp;<FontAwesomeIcon icon={faStar}/></span>&nbsp;({props.numberOfReviews})</p>}
        </div>
        <Image src={props.product.imageUrls[0]} width={50} height={50} alt={`Product image for ${props.product.name}`}/>
      </RatingsDisplay>
      </RatingsContainer>
      <PostReviewForm onSubmit={handleSubmit(onFormSubmit)}>
        <div>
        <label>Rate this product</label>
        <StarRatingContainer>
      {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              style={{
                cursor: 'pointer',
                color:
                  (hoveredRating > 0 ? hoveredRating : ratingField.value) >= value
                    ? 'gold'
                    : 'gray',
                // height: 40,
              }}
              onClick={() => handleRating(value)}
              onMouseEnter={() => handleMouseEnter(value)}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faStar} />
            </span>
          ))}
      </StarRatingContainer>
      {errors.rating && <p>{errors.rating.message?.toString()}</p>}
        </div>
        <ReviewFormDivider/>
        <h2>Review this product</h2>
        <label>Title</label>
        <input type="text" placeholder='Review title' {...register('title')}/>
        {errors.title && <p>{errors.title.message?.toString()}</p>}
        <label>Description</label>
        <textarea placeholder='Description' {...register('description')} />
        {errors.description && <p>{errors.description.message?.toString()}</p>}
        <button type='submit'>SUBMIT</button>
      </PostReviewForm>
    </PostReviewContainer>
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