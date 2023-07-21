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
import ReviewDataModel from '@/models/product_review_model';

type productPageProp= {
    product: Product,
    seller: SellerDataModel,
    category :ProductCategory,
    parentCategory: ProductCategory | null
}

function ProductPage(props: productPageProp) {
  const [currentIndex, setcurrentIndex] = useState(0)
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
    console.log('Added to cart')
  } 
  const buyNow=()=>{
    console.log('Clicked on buy now')
  }
  return (
    <ProductPageContainer>
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
      <ProductButtonContainer>
          <AddToCart onClick={addToCart}><span><FontAwesomeIcon icon={faCartShopping}/></span>ADD TO CART</AddToCart>
          <div />
          <BuyNow onClick={buyNow}><span><FontAwesomeIcon icon={faBoltLightning}/></span>BUY NOW</BuyNow>
      </ProductButtonContainer>
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
        <ProductPriceContainer>
          <h1>₹{discountedPrice}</h1>
          {discount>0 && <span>₹{Math.floor(props.product.price)}</span>}
          {discount>0 && <h4>{props.product.discount}% off</h4>}
        </ProductPriceContainer>
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
      fallback: true, // or true if you want to enable fallback rendering
    };
}

export async function getStaticProps(context:GetStaticPropsContext){
    const {params} = context
    const product = await ProductDataModel.findOne({_id: params?.iD})
    const seller = await Seller.findOne({_id: product.seller})
    const category = await ProductCategoryModel.findOne({_id: product.category})
    const reviews=await ReviewDataModel.find({product:product._id})
    console.log('Reviews are: ',reviews)
    let parentCategory=null
    if(category.parentCategory!=null)
    {
        parentCategory = await ProductCategoryModel.findOne({_id: category.parentCategory})
    }
    console.log('Got category: ',category)
    console.log('Got parent category: ',parentCategory)
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            seller: JSON.parse(JSON.stringify(seller)),
            parentCategory: parentCategory!=null?JSON.parse(JSON.stringify(parentCategory)):null,
            category : JSON.parse(JSON.stringify(category))            
    }
    }
}

export default ProductPage
