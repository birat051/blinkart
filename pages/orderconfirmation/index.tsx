import { CustomUser } from '@/components/AddressForm'
import { Address } from '@/models/address_model'
import  { Order } from '@/models/order_model'
import OrderServices, { ProductDetails } from '@/services/orderServices'
import RouteHelper from '@/services/routerHelper'
import { DeliveryAddressContainer, OrderConfirmation, OrderListView, OrderPlacedContainer, OrderPlacedLeftColumn, OrderPlacedRightColumn, OrderView, TotalPriceView } from '@/styles/orderconfirmation.style'
import connectToDatabase from '@/utils/connectDB'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


export type orderConfirmProp={
    order:Order,
    address: Address,
    products: ProductDetails[]
}


function OrderConfirmationPage(props:orderConfirmProp) {
  const router=useRouter()
  const deliveryDate=new Date()
  const [totalPrice, settotalPrice] = useState(0)
  const goToOrders=()=>{
    router.push(RouteHelper.getOrderRoute())
  }
  const goToProducts=(productId:string)=>{
    router.push(RouteHelper.getProductRoute(productId))
  }

  useEffect(() => {
    let price=0
    props.order.products.forEach((product)=>{
        price=(product.price*product.quantity)+price
        price=price-(product.discount/100*product.price*product.quantity)
    })
    settotalPrice(price)
  }, [])
  
  return (
    <OrderConfirmation>
        <Head>
        <title>Order Confirmation</title>
        </Head>
       <OrderPlacedContainer>
                    <OrderPlacedLeftColumn>
                        <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/orderPlacedV2_cb4f64.png'/>
                        <div>
                            <h1>Order placed for ₹{Math.floor(totalPrice)}!</h1>
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
            {props.products.map((product:ProductDetails,index)=>{
                return (
                    <OrderView key={product.productId}>
                        <img src={product.imageUrl} />  
                        <h1 onClick={()=>goToProducts(product.productId)}>{product.name}</h1>
                        {index===0 && <div>
                            <FontAwesomeIcon icon={faTruck} style={{color: '#2872F1',marginRight:'10px'}} size={'lg'}/>Delivery by {deliveryDate.toDateString()} 
                        </div>}
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
  return {
  props: {
      order,
      address,
      products
  }
  }
}