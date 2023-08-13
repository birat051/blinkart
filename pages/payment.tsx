import { StyledRadioInput } from '@/components/AddressForm/AddressForm.style';
import CreditCardForm from '@/components/CreditCardForm';
import { ProductOrder } from '@/models/order_model';
import OrderServices, { CreateOrderResponse } from '@/services/orderServices';
import RouteHelper from '@/services/routerHelper';
import { CLEAR_CART } from '@/stateManagement/actions/cartActions';
import { RootState } from '@/stateManagement/store';
import { CartColumn, CartContainer, CartPriceColumn, PriceColumnDivider } from '@/styles/cart.style'
import { PaymentOptionHeading, PaymentOptions } from '@/styles/payment.style';
import { BuyNow } from '@/styles/product.style';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { useDispatch, useSelector } from 'react-redux';

interface CustomUser extends User {
  id: string;
}

function PaymentPage() {
  const cartItems = useSelector((state: RootState) => state.cart);
  // console.log('Got cart items: ',cartItems)
  const address = useSelector((state: RootState) => state.address.address);
  // const address = useSelector((state: RootState) => state.address.address);
  console.log('Got address: ',address?._id)
  const [price, setprice] = useState(0)
  const [discount, setdiscount] = useState(0)
  const [delivery, setdelivery] = useState(0)
  const [isLoading, setisLoading] = useState(false)
  const [selectedPayment, setselectedPayment] = useState<string | null>(null)
  const router=useRouter()
  const { data: session } = useSession() 
  const dispatch=useDispatch()
  useEffect(() => {
    if (cartItems.items.length === 0 ) {
        router.push('/');
        return;
    }
    let totalPrice=0
    let totalDiscount=0
    cartItems.items.forEach((item)=>{
      totalPrice=Math.floor((item.price*item.quantity)+totalPrice)
      totalDiscount=Math.floor((item.discount/100*item.price*item.quantity)+totalDiscount)
    })  
    if(totalPrice-totalDiscount<500)
    setdelivery(40)
    else
    setdelivery(0)
    setprice(totalPrice)
    setdiscount(totalDiscount)
  }, []
  )
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedPayment(event.target.value);
  };
  const processPayment=async (paymentMethod:string,creditCardNumber:string|null)=>{
    setisLoading(true)
    const products:ProductOrder[]=[]
    cartItems.items.forEach((item)=>{
      const newProduct:ProductOrder={
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount
      }
      products.push(newProduct)
    })
    if(address!=null)
    {
      const userId=(session?.user as CustomUser)?.id
      const shippingAddress=address._id
      const body={
        userId,
        products,
        shippingAddress,
        deliveryFees:delivery,
        paymentMethod,
        creditCardNumber,
    }
      const res= await fetch('/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data= await res.json()
      if(res.status===201)
      {
           dispatch(  {type: CLEAR_CART,
            })
          router.push(RouteHelper.getOrderConfirmationRoute(data?._id).toString())
      }
          else{

        alert('Payment failed to process with error: '+ data.error)
      }
    }
    else
    alert('No address has been selected')
    setisLoading(false)
  }
  return (
    <LoadingOverlayWrapper active={isLoading}>
    <CartContainer>
        <Head>
          <title>Payment Page</title>
        </Head>
        <CartColumn>
            <PaymentOptionHeading>
                <h1>Payment Options</h1>
            </PaymentOptionHeading>
            <PaymentOptions className={selectedPayment === 'creditcard'?'active':''}>
            <StyledRadioInput
            type="radio"
            value="creditcard"
            checked={selectedPayment === 'creditcard'}
            onChange={handlePaymentChange}
            />
            <div>
              <h1>Debit/Credit/ATM Card</h1>
              {selectedPayment === 'creditcard' && <CreditCardForm price={price-discount} processPayment={processPayment}/>}
            </div>
            </PaymentOptions>
            <PaymentOptions className={selectedPayment === 'cod'?'active':''}>
            <StyledRadioInput
            type="radio"
            value="cod"
            checked={selectedPayment === 'cod'}
            onChange={handlePaymentChange}
            />
            <div>
            <h1>Cash on Delivery</h1>
            {selectedPayment === 'cod' && <BuyNow onClick={()=>processPayment('Cash on Delivery',null)}>PAY ₹ {price-discount}</BuyNow>}
            </div>
            </PaymentOptions>
        </CartColumn>
        {
        cartItems.items.length>0 && <CartPriceColumn>
          <p>Price Details</p>
          <div>
            <h3>Price-{cartItems.items.length} item(s)</h3>
            <h3>₹{price}</h3>
          </div>
          <div>
            <h3>Discount</h3>
            <h4>-₹{discount}</h4>
          </div>
          <div>
            <h3>Delivery Charges</h3>
            <h4>{delivery===0?'Free':delivery}</h4>
          </div>
          <PriceColumnDivider />
          <div>
            <h1>Total Amount</h1>
            <h1>₹{price-discount+delivery}</h1>
          </div>
          {discount > 0 && <PriceColumnDivider />}
          {discount > 0 && <h5>You will save ₹{discount} on this order</h5>}
        </CartPriceColumn>
      }
    </CartContainer>
    </LoadingOverlayWrapper>
  )
}

export default PaymentPage
