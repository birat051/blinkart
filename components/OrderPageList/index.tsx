import React, { useEffect, useState } from 'react'
import { OrderContainer, OrderElement, OrderPageListView } from './OrderPageList.style'
import { OrderDetailsResponse, ProductDetails } from '@/services/orderServices'
import { useRouter } from 'next/router'
import RouteHelper from '@/services/routerHelper'
import { useSession } from 'next-auth/react'
import { CustomUser } from '../AddressForm'

type orderPageListProp={
  orderList: OrderDetailsResponse[],
  totalPages: number,
  changeIsLoading: (value: boolean)=>void
}

function OrderPageList(props: orderPageListProp) {
  const [orderList, setorderList] = useState<OrderDetailsResponse[]>(props.orderList)
  const router=useRouter()
  const [pageNumber, setpageNumber] = useState(1)
  const { data: session } = useSession()
  const goToOrderDetails=(orderid:string)=>{
    router.push(RouteHelper.getOrderDetailsRoute(orderid))
  }
  const userId=(session?.user as CustomUser)?.id
  useEffect(() => {
    if(pageNumber===1)
    return
    async function getOrdersCurrentPage(){
      props.changeIsLoading(true)
      const response = await fetch(`/api/order/allOrders?pageNumber=${pageNumber}&limit=${3}&userId=${(session?.user as CustomUser)?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      props.changeIsLoading(false)
      if(response.status===200)
      {
        const data:OrderDetailsResponse[]=await response.json()
        console.log('Data is: ',data)
        setorderList([...orderList,...data])
      }
    }
    getOrdersCurrentPage()
  }, [pageNumber])
  
  return (
    <OrderPageListView>
      {orderList.map((order: OrderDetailsResponse)=>{
        return (
          <OrderContainer key={order.orderId} onClick={()=>goToOrderDetails(order.orderId)}>
            {order.products.map((product:ProductDetails)=>{
                return (
                    <OrderElement key={product.productId+order.orderId}>
                        <img src={product.imageUrl} />  
                        <h1>{product.name}</h1>
                        <div />
                        <h2>₹ {Math.floor(product.price)}{product.discount>0 && <span>&nbsp; {product.discount}% off</span>}</h2>
                    </OrderElement>
                )
            })}
          </OrderContainer>
        )
      })}
      {pageNumber<props.totalPages &&<button onClick={()=>setpageNumber(pageNumber+1)}>Show More Orders</button>}
    </OrderPageListView>
  )
}

export default OrderPageList