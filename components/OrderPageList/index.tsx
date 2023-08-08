import React, { useState } from 'react'
import { OrderContainer, OrderElement, OrderPageListView } from './OrderPageList.style'
import { OrderDetailsResponse, ProductDetails } from '@/services/orderServices'
import { useRouter } from 'next/router'
import RouteHelper from '@/services/routerHelper'

type orderPageListProp={
  orderList: OrderDetailsResponse[],
  totalPages: number
}

function OrderPageList(props: orderPageListProp) {
  const router=useRouter()
  const [pageNumber, setpageNumber] = useState(1)
  const goToOrderDetails=(orderid:string)=>{
    router.push(RouteHelper.getOrderDetailsRoute(orderid))
  }
  return (
    <OrderPageListView>
      {props.orderList.map((order: OrderDetailsResponse)=>{
        return (
          <OrderContainer key={order.orderId} onClick={()=>goToOrderDetails(order.orderId)}>
            {order.products.map((product:ProductDetails)=>{
                return (
                    <OrderElement key={product.productId+order.orderId}>
                        <img src={product.imageUrl} />  
                        <h1>{product.name}</h1>
                        <div />
                        <h2>₹ {Math.floor(product.price)}</h2>
                    </OrderElement>
                )
            })}
          </OrderContainer>
        )
      })}
      {pageNumber<props.totalPages &&<button>Show More Orders</button>}
    </OrderPageListView>
  )
}

export default OrderPageList