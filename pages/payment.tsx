import { StyledRadioInput } from '@/components/AddressForm/AddressForm.style';
import CreditCardForm from '@/components/CreditCardForm';
import { RootState } from '@/stateManagement/store';
import { CartColumn, CartContainer, CartPriceColumn, PriceColumnDivider } from '@/styles/cart.style'
import { PaymentOptionHeading, PaymentOptions } from '@/styles/payment.style';
import { BuyNow } from '@/styles/product.style';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function PaymentPage() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const address = useSelector((state: RootState) => state.address);
  const [price, setprice] = useState(0)
  const [discount, setdiscount] = useState(0)
  const [delivery, setdelivery] = useState(0)
  const [selectedPayment, setselectedPayment] = useState<string | null>(null)
  const router=useRouter()
  useEffect(() => {
    if (cartItems.items.length === 0 || address===null) {
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
  return (
    <CartContainer>
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
              {selectedPayment === 'creditcard' && <CreditCardForm price={price-discount} />}
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
            {selectedPayment === 'cod' && <BuyNow>PAY ₹ {price-discount}</BuyNow>}
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
  )
}

export default PaymentPage
