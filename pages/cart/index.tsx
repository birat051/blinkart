import AddressModel, { Address } from '@/models/address_model'
import { RootState } from '@/stateManagement/store'
import { CartColumn, CartContainer, CartImageColumn, CartPriceColumn, CartPriceRow, CartProductColumn, CartProductLink, CartQuantity, CartViewContainer, EmptyCartContainer, PlaceOrderContainer, PriceColumnDivider } from '@/styles/cart.style'
import connectToDatabase from '@/utils/connectDB'
import { GetServerSidePropsContext } from 'next'
import { User } from 'next-auth'
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { ADD_TO_CART, CartItem, REDUCE_ITEM_QUANTITY, REMOVE_FROM_CART } from '@/stateManagement/actions/cartActions'
import { CustomButton } from '@/styles/globals.style'


type cartPropType={
  addresses: Address[]
}

interface CustomUser extends User {
  id: string;
}

function CartPage(props:cartPropType) {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [price, setprice] = useState(0)
  const [discount, setdiscount] = useState(0)
  const [delivery, setdelivery] = useState(0)
  const dispatch= useDispatch()
  // console.log('Cart items are: ',cartItems)
  const addQuantity=(item:CartItem)=>{
    dispatch(  {type: ADD_TO_CART,
      payload: item})
  }
  const reduceQuantity=(item:CartItem)=>{
    if(item.quantity===1)
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item.id
    })
    else
    dispatch({
      type: REDUCE_ITEM_QUANTITY,
      payload: item.id
    })
    console.log('Item quantity reduced')
  }
  useEffect(() => {
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
  }, [cartItems.items])
  
  return (
    <CartContainer>
      {cartItems.items.length===0 && 
      <EmptyCartContainer>
        <Image src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='Image for empty cart' height={222} width={162} style={{objectFit: 'contain'}} />
        <h1>Your cart is empty!</h1>
        <p>Explore our wide selection and find something you like</p>
      </EmptyCartContainer>}
      {
        cartItems.items.length>0 && <CartColumn>
          {cartItems.items.map((item)=>{
            return (
            <CartViewContainer key={item.id}>
              <CartImageColumn>
              <img src={item.imageUrl} alt={`Image for product ${item.name}`}/>
              <CartQuantity>
                <FontAwesomeIcon  icon={faCircleMinus} size="xl" style={{cursor: 'pointer'}} onClick={()=>reduceQuantity(item)}/>
                <h1>{item.quantity}</h1>
                <FontAwesomeIcon  icon={faCirclePlus} size="xl" style={{cursor: 'pointer'}} onClick={()=>addQuantity(item)}/>
              </CartQuantity>
              </CartImageColumn>
              <CartProductColumn>
                <CartProductLink href={`/products/${item.id}`}>{item.name}</CartProductLink>
                <CartPriceRow>
                  {item.discount>0 && <h3>₹{Math.floor(item.price)}</h3>}
                  <h2>₹{Math.floor(item.discountedPrice)}</h2>
                  {item.discount> 0 && <h4>{item.discount}% off</h4>}
                </CartPriceRow>
              </CartProductColumn>
            </CartViewContainer>
            )
          })}
          <PlaceOrderContainer>
            <CustomButton height='40px' backgroundcolor='#FA651B' color='white' >PLACE ORDER</CustomButton>
          </PlaceOrderContainer>
        </CartColumn>
      }
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

export async function getServerSideProps(context: GetServerSidePropsContext){
  const session =await getSession(context)
  await connectToDatabase()
  const userAddresses=await AddressModel.find({userId: (session?.user as CustomUser)?.id})
  console.log('User address is: ',userAddresses)
  return {
    props: {
      userAddresses: JSON.parse(JSON.stringify(userAddresses))
    }
  }
}

export default CartPage
