import { BannerNav } from '@/components/Banner/Banner.style';
import ProductCategoryModel, { ProductCategory } from '@/models/product_category_model';
import ProductDataModel, { Product } from '@/models/product_data_model';
import Seller, { SellerDataModel } from '@/models/seller_model';
import { AddToCart, BuyNow, ProductButtonContainer, ProductColumnLeft, ProductDetailsContainer, ProductImage, ProductImageContainer, ProductLink, ProductLinkContainer, ProductPageContainer, ProductPriceContainer } from '@/styles/product.style';
import connectToDatabase from '@/utils/connectDB';
import {faBoltLightning, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticPropsContext } from 'next';
import React, { useState } from 'react'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ReviewDataModel, { ReviewModel } from '@/models/product_review_model';
import UserDataModel, { UserModel } from '@/models/user_model';
import ReviewSection from '@/components/ReviewSection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stateManagement/store';
import { ADD_TO_CART, CartItem } from '@/stateManagement/actions/cartActions';
import Head from 'next/head';

type productPageProp= {
    product: Product,
    seller: SellerDataModel,
    category :ProductCategory,
    parentCategory: ProductCategory | null,
    reviews: ReviewModel[],
    reviewUserMap: {
      [key: string]: string // Replace 'any' with the type of your subcategory object
    },
    totalReviews: number,
    averageRating: string
}

function ProductPage(props: productPageProp) {
  const [currentIndex, setcurrentIndex] = useState(0)
  const dispatch=useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart);
  const discount=props.product.discount!=null?Math.floor(props.product.price*props.product.discount/100):0
  const discountedPrice=Math.floor(props.product.price-discount)
  // console.log('Discount is: ',discount)
  const goToPrevBanner=()=>{
    // console.log('Going to prev banner')
    const isFirst=currentIndex===0
    const newIndex= isFirst? props.product.imageUrls.length-1:currentIndex-1
    setcurrentIndex(newIndex)
    }
    const goToNextBanner=()=>{
    // console.log('Going to next banner')
    const isLast=currentIndex===props.product.imageUrls.length-1
    const newIndex=isLast? 0:currentIndex+1
    setcurrentIndex(newIndex)
  }
  const addToCart=()=>{
    const cartItem: CartItem = {
      id: props.product._id, 
      name: props.product.name,
      imageUrl: props.product.imageUrls[0],
      price: props.product.price,
      discountedPrice: discountedPrice,
      discount: props.product.discount ?? 0, 
      quantity: 1, 
    };
    dispatch({
      type: ADD_TO_CART,
      payload: cartItem,
    });
    console.log('Added to cart')
    console.log('Cart items are: ',cartItems)
  } 
  const buyNow=()=>{
    console.log('Clicked on buy now')
  }
  return (
    <ProductPageContainer>
       <Head>
          <title>{props.product.name}</title>
        </Head>
      <ProductColumnLeft>
      <ProductImageContainer>
        <BannerNav className='left'>
        <FontAwesomeIcon icon={faChevronLeft} onClick={goToPrevBanner}/>
        </BannerNav>
        {props.product.imageUrls.map((image,index)=>{
            return(
            <ProductImage key={props.product._id+image} src={image} className={index==currentIndex?'active':''} />
            )
        })}
        <BannerNav className='right' onClick={goToNextBanner}>
        <FontAwesomeIcon icon={faChevronRight}/>
        </BannerNav>
      </ProductImageContainer>
      {/* {props.product.quantity>0 && <ProductButtonContainer>
          <AddToCart onClick={addToCart}><span><FontAwesomeIcon icon={faCartShopping}/></span>ADD TO CART</AddToCart>
          <div />
          <BuyNow onClick={buyNow}><span><FontAwesomeIcon icon={faBoltLightning}/></span>BUY NOW</BuyNow>
      </ProductButtonContainer>} */}
      {props.product.quantity>0 && <AddToCart onClick={addToCart}><span><FontAwesomeIcon icon={faCartShopping}/></span>ADD TO CART</AddToCart>}
      </ProductColumnLeft>
      <ProductDetailsContainer>
        <ProductLinkContainer>
          <ProductLink href='/'> Home &gt;</ProductLink>
          {props.parentCategory && <ProductLink href={`/categories/${props.parentCategory._id}/1`}>{props.parentCategory.name}&nbsp;&gt;</ProductLink>}
          <ProductLink href={`/categories/${props.category._id}/1`}>&nbsp;{props.category.name}&nbsp;&gt;</ProductLink>
          <h2>&nbsp;{props.product.brand}&nbsp;&gt;&nbsp;{props.product.name}</h2>
        </ProductLinkContainer>
        <h2>{props.product.name}</h2>
        {discount>0 && <h4>Extra ₹{discount} off</h4>}
        {props.product.quantity>0 && <ProductPriceContainer>
          <h1>₹{discountedPrice}</h1>
          {discount>0 && <span>₹{Math.floor(props.product.price)}</span>}
          {discount>0 && <h4>{props.product.discount}% off</h4>}
        </ProductPriceContainer>}
        {
          props.product.quantity<1 && <ProductPriceContainer>
            <h2>Product is currently out of stock!</h2>
          </ProductPriceContainer>
        }
        <h5>Highlights</h5>
        <ul>
        {props.product.highlights.map((highlight)=>{
          return (
            <li key={highlight}>{highlight}</li>
          )
        })}
        </ul>
        <h5>Description</h5>
        <p>{props.product.description}</p>
        <h5>Seller</h5>
        <h3>{props.seller.name}</h3>
        <p>{props.seller.address}</p>
        {props.totalReviews>0 && <ReviewSection reviews={props.reviews} totalReviewCount={props.totalReviews} avgRating={props.averageRating} productId={props.product._id} reviewUser={props.reviewUserMap}/>}
      </ProductDetailsContainer>
    </ProductPageContainer>
  )
}


export async function getStaticPaths(){
    await connectToDatabase();
    const products = await ProductDataModel.find();
    const paths = [];
    for (const product of products) {
        paths.push({
          params: {
            iD: product._id.toString(),
          },
        });
    }
    return {
      paths,
      fallback: true, 
    };
}

export async function getStaticProps(context:GetStaticPropsContext){
    const {params} = context
    await connectToDatabase();
    const product = await ProductDataModel.findOne({_id: params?.iD})
    console.log('Product is: ',product)
    const seller = await Seller.findOne({_id: product.seller.toString()})
    const category = await ProductCategoryModel.findOne({_id: product.category})
    const reviews=await ReviewDataModel.find({product:product._id})
    const totalReviews=await ReviewDataModel.countDocuments({product:product._id})
    // console.log('Reviews are: ',reviews)
    const userIds = JSON.parse(JSON.stringify(reviews)).map((review:ReviewModel) => review.user);
    const users = await UserDataModel.find({ _id: { $in: userIds } }).lean(); // Fetch users by their ids
    const reviewUserMap: { [key: string]: string } = {};
    JSON.parse(JSON.stringify(reviews)).forEach((review:ReviewModel) => {
      const user = JSON.parse(JSON.stringify(users)).find((user:UserModel) => user._id.toString() === review.user.toString());
      if (user) {
          reviewUserMap[review._id] = user.name;
      }
    });
    let parentCategory=null
    if(category.parentCategory!=null)
    {
        parentCategory = await ProductCategoryModel.findOne({_id: category.parentCategory})
    }
    const totalRating = reviews.reduce((sum: number, review: ReviewModel) => sum + review.rating, 0);
    const averageRating = totalRating / totalReviews;
    const roundedAverageRating = averageRating.toFixed(1);
    console.log('Sellers are: ',seller)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            seller: JSON.parse(JSON.stringify(seller)),
            parentCategory: parentCategory!=null?JSON.parse(JSON.stringify(parentCategory)):null,
            category : JSON.parse(JSON.stringify(category)),
            reviews: JSON.parse(JSON.stringify(reviews)),
            reviewUserMap: reviewUserMap,
            totalReviews: totalReviews,
            averageRating: roundedAverageRating
    },
    revalidate: 600
    }
}

export default ProductPage
