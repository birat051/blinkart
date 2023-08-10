import { Product } from "@/models/product_data_model"
import { PriceView, ProductContainer, ProductImage, ProductSpecification } from "./ProductView.style"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import RouteHelper from "@/services/routerHelper"


type productViewProp={
  product: Product
}


function ProductView(props:productViewProp) {
  const [price,setPrice]=useState(props.product.price)
  const router=useRouter()
  const goToProduct=()=>{
    router.push(RouteHelper.getProductRoute(props.product._id))
  }
  useEffect(() => {
    if(props.product.discount && props.product.discount>0)
    setPrice(Math.floor(props.product.price * (100 - props.product.discount) / 100));
  }, [props.product.discount])
  // console.log('Discount is: ',props.product.discount)
  return (
    <ProductContainer onClick={goToProduct}>
      <ProductImage>
      <img src={props.product.imageUrls[0]} alt={`Image for product ${props.product.name}`}/>
      </ProductImage>
      <ProductSpecification>
        <h1>{props.product.name}</h1>
        {props.product.highlights.map((highlight)=>{
          return <p key={props.product._id+highlight}><span>•</span>{highlight}</p>
        })}
      </ProductSpecification>
      <PriceView>
        <h2>₹ {price}</h2>
        {props.product.discount && props.product.discount!==0 && <p><span>{Math.floor(props.product.price)}</span>
        {props.product.discount}% off
        </p>}
      </PriceView>
    </ProductContainer>
  )
}



export default ProductView
