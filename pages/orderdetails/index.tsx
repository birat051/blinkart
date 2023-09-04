import { CustomUser } from '@/components/AddressForm'
import OrderServices, { ProductDetails } from '@/services/orderServices'
import connectToDatabase from '@/utils/connectDB'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { orderConfirmProp } from '../orderconfirmation'
import Head from 'next/head'
import { DeliveryAddressContainer, OrderConfirmation, OrderListView } from '@/styles/orderconfirmation.style'
import { useRouter } from 'next/router'
import RouteHelper from '@/services/routerHelper'
import OrderStatus, { OrderStatusValues } from '@/components/OrderStatus'
import { OrderDetailsView, ProductNameContainer, ReviewProductLink, TotalPriceContainer } from '@/styles/orderdetails.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ReviewDataModel from '@/models/product_review_model'

interface ProductReviewMap{
  [productId: string]: boolean;
}

type OrderDetailsProp = orderConfirmProp & {
  reviewStatusMap?: ProductReviewMap;
};

function OrderDetailPage(props:OrderDetailsProp) {
  const router=useRouter()
  const [totalPrice, settotalPrice] = useState(0)
  const goToProducts=(productId:string)=>{
    router.push(RouteHelper.getProductRoute(productId))
  }
  useEffect(() => {
    let price=0
    props.order.products.forEach((product)=>{
        price=product.price*product.quantity+price
        price=price-(product.discount/100*product.quantity*product.price)
    })
    console.log('Price is: ',price)
    settotalPrice(price)
  }, [])
  return (
    <OrderConfirmation>
      <Head>
        <title>Order Information</title>
      </Head>
      <DeliveryAddressContainer>
        <h1>Delivery Address</h1>
        <h2>{props.address.name}</h2>
        <p>{props.address.street},{props.address.locality}-{props.address.postalCode}, {props.address.state}</p>
        <p><span>Phone Number</span> {props.address.mobileNumber}</p>
        <p><span>Payment method</span>&nbsp;{props.order.paymentMethod}</p>
        </DeliveryAddressContainer>
        <OrderListView>
            {props.products.map((product:ProductDetails,index)=>{
                return (
                    <OrderDetailsView key={product.productId}>
                        <img src={product.imageUrl} />
                        <ProductNameContainer>
                        <h1 onClick={()=>goToProducts(product.productId)}>{product.name}</h1>
                        {props.order.deliveryStatus==='Delivered' && props.reviewStatusMap && !props.reviewStatusMap[product.productId] && <ReviewProductLink href={`/review/post?productId=${product.productId}`}><FontAwesomeIcon icon={faStar} style={{marginRight:'5px'}}/>Rate and Review Product</ReviewProductLink>} 
                         </ProductNameContainer>  
                        {index===0 &&<OrderStatus activeStatus={props.order.deliveryStatus as OrderStatusValues}/>
                        }
                        {index!==0 && <div />}
                        <h2>₹ {Math.floor(product.price)*product.quantity}{product.discount>0 && <span>&nbsp; {product.discount} %off</span>}</h2>
                    </OrderDetailsView>
                )
            })}
            <TotalPriceContainer>
                <h2>
                    Total &nbsp; ₹ {Math.floor(totalPrice)}
                </h2>
            </TotalPriceContainer>
        </OrderListView>
    </OrderConfirmation>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext)
{
  const session =await getSession(context)
  const {query} = context
    await connectToDatabase()
    const {order,address,products,error}=await OrderServices.getOrderDetails(query?.orderId as string)
    if (error != null || (session?.user as CustomUser)?.id!=order.userId) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
  }
  if(order.deliveryStatus!=='Delivered' || !products)
  return {
    props: {
        order,
        address,
        products
    }
  }
  const reviewMap:ProductReviewMap={}
  const reviewList = await Promise.all(
    products?.map(async (product) => {
      const review = await ReviewDataModel.findOne({ product: product.productId, user: (session?.user as CustomUser)?.id });
      if (review) {
        return {
          id: product.productId,
          status: true,
        };
      } else {
        return {
          id: product.productId,
          status: false,
        };
      }
    })
  );
  reviewList?.forEach(async (product)=>{
    reviewMap[product.id]=product.status
  })
  // console.log('Got products: ',products)
  // console.log('Review map is: ',reviewMap)
  return {
  props: {
      order,
      address,
      products,
      reviewStatusMap:reviewMap
  }
  }
}



export default OrderDetailPage