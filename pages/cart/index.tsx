import AddressModel, { Address } from '@/models/address_model'
import { RootState } from '@/stateManagement/store'
import { CartContainer, EmptyCartContainer } from '@/styles/cart.style'
import connectToDatabase from '@/utils/connectDB'
import { GetServerSidePropsContext } from 'next'
import { User } from 'next-auth'
import { getSession } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'


type cartPropType={
  addresses: Address[]
}

interface CustomUser extends User {
  id: string;
}

function CartPage(props:cartPropType) {
  const cartItems = useSelector((state: RootState) => state.cart);
  console.log('Cart items are: ',cartItems)
  return (
    <CartContainer>
      {cartItems.items.length===0 && 
      <EmptyCartContainer>
        <Image src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='Image for empty cart' height={222} width={162} style={{objectFit: 'contain'}} />
        <h1>Your cart is empty!</h1>
        <p>Explore our wide selection and find something you like</p>
      </EmptyCartContainer>}
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
