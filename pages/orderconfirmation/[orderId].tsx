import { Address } from '@/models/address_model'
import OrderModel, { Order } from '@/models/order_model'
import { Product } from '@/models/product_data_model'
import OrderServices from '@/services/orderServices'
import RouteHelper from '@/services/routerHelper'
import { DeliveryAddressContainer, OrderConfirmation, OrderListView, OrderPlacedContainer, OrderPlacedLeftColumn, OrderPlacedRightColumn, OrderView, TotalPriceView } from '@/styles/orderconfirmation.style'
import connectToDatabase from '@/utils/connectDB'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'


type orderConfirmProp={
    order:Order,
    address: Address,
    products: Product[]
}


function OrderConfirmationPage(props:orderConfirmProp) {
  const router=useRouter()
  const deliveryDate=new Date()
  const [totalPrice, settotalPrice] = useState(0)
  if(router.isFallback)
  {
    return (
        <LoadingOverlayWrapper active={true}>
            <OrderConfirmation>
            </OrderConfirmation>
        </LoadingOverlayWrapper>
    )
  }
  const goToOrders=()=>{
    router.push(RouteHelper.getOrderRoute())
  }
  const goToProducts=(productId:string)=>{
    router.push(RouteHelper.getProductRoute(productId))
  }

  useEffect(() => {
    let price=0
    props.order.products.forEach((product)=>{
        price=product.price+price
        price=price-product.discount
    })
    settotalPrice(price)
  }, [])
  
  return (
    <OrderConfirmation>
       <OrderPlacedContainer>
                    <OrderPlacedLeftColumn>
                        <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/orderPlacedV2_cb4f64.png'/>
                        <div>
                            <h1>Order placed for ₹265!</h1>
                            <p>Your 1 item will be delivered by <span>{deliveryDate.toDateString()}</span></p>
                        </div>
                    </OrderPlacedLeftColumn>
                    <OrderPlacedRightColumn>
                        <div>
                            <h1>Why Call? Just Click!</h1>
                            <p>Easily track all of your Blinkart orders</p>
                            <button onClick={goToOrders}>Go to My Orders</button>
                        </div>
                        <img src='https://img1a.flixcart.com/www/helpcenter/assets/images/1529927950114/group-2%403x.png'/>
                    </OrderPlacedRightColumn>
        </OrderPlacedContainer>
        <DeliveryAddressContainer>
        <h1>Delivery Address</h1>
        <h2>{props.address.name}</h2>
        <p>{props.address.street},{props.address.locality}-{props.address.postalCode}, {props.address.state}</p>
        <p><span>Phone Number</span> {props.address.mobileNumber}</p>
        </DeliveryAddressContainer>
        <OrderListView>
            {props.products.map((product:Product)=>{
                return (
                    <OrderView key={product._id}>
                        <img src={product.imageUrls[0]} />  
                        <h1 onClick={()=>goToProducts(product._id)}>{product.name}</h1>
                        <p>
                            <FontAwesomeIcon icon={faTruck} style={{color: '#2872F1',marginRight:'10px'}} size={'lg'}/>Delivery by {deliveryDate.toDateString()} 
                        </p>
                        <h2>₹ {Math.floor(product.price)}</h2>
                    </OrderView>
                )
            })}
            <TotalPriceView>
                <h2>
                    Total &nbsp; ₹ {Math.floor(totalPrice)}
                </h2>
            </TotalPriceView>
        </OrderListView>
    </OrderConfirmation>
  )
}

export default OrderConfirmationPage

export async function getStaticPaths(){
    await connectToDatabase()
    const orders=await OrderModel.find()
    const paths:Object[]=[]
    orders.forEach((order)=>{
        paths.push({params:{
            orderId: order._id.toString()
        }})
    })
    return {
        paths,
        fallback: true, // or true if you want to enable fallback rendering
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;
    const {order,address,products,error}=await OrderServices.getOrderDetails(params?.orderId as string)
    if (error != null) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
    }
    
   return {
    props: {
        order,
        address,
        products
    }
   }
}