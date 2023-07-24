import React from 'react'
import { AllReviewLink, RatingContainer, RatingsView, ReviewSectionContainer, ReviewView } from './ReviewSection.style'
import { ReviewModel } from '@/models/product_review_model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

type ratingPropType={
    reviews: ReviewModel[]
    avgRating: string,
    totalReviewCount: number,
    reviewUser: {
        [key: string]: string // Replace 'any' with the type of your subcategory object
      }
    productId: string
}


function ReviewSection(props:ratingPropType) {
  return (
    <ReviewSectionContainer>
      <RatingsView>
        <h1>Ratings and Reviews</h1>
        <p>{props.avgRating}<span><FontAwesomeIcon icon={faStar} width={16} height={16}/></span></p>
        </RatingsView>
        {props.reviews.map((review)=>{
            return (
                <ReviewView key={review.title+review.comment}>
                    <div>
                        <RatingContainer>
                            {review.rating}&nbsp;<FontAwesomeIcon icon={faStar} width={16} height={16}/>
                        </RatingContainer>
                        <h2>{review.title}</h2>
                    </div>
                    <p>{review.comment}</p>
                    <div>
                        <h3>{props.reviewUser[review._id]}</h3>
                        {!review.createdAt && <h4>{new Date().toDateString()}</h4>}
                        {review.createdAt && <h4>{review.createdAt.toDateString()}</h4>}
                    </div>
                </ReviewView>
            )
        })}
        {props.totalReviewCount>3 && <AllReviewLink href={`/review/${props.productId}/1`}>All {props.totalReviewCount} reviews</AllReviewLink>}
    </ReviewSectionContainer>
  )
}

export default ReviewSection
