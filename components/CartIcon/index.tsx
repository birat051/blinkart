import React, { useEffect, useState } from 'react'
import {Stack,Badge} from "@mui/material"
import { ShoppingCart } from '@mui/icons-material'
import { RootState } from '@/stateManagement/store';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

function CartIcon() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [quantity, setquantity] = useState(0)
  const { data: session, status } = useSession()
  useEffect(() => {
    let itemquantity=0
    if(status!=='authenticated')
    {
      return
    }
    else if(cartItems.items.length>0)
    {
        cartItems.items.forEach((item)=>{
            itemquantity=itemquantity+item.quantity
        })
    }
    // console.log('Item quantity is: ',itemquantity)
    setquantity(itemquantity)
  }, [cartItems.items])
  return (
    <Stack spacing={2} direction='row' style={{marginRight: '5px'}}>
        <Badge badgeContent={quantity} color='error'>
            <ShoppingCart />
        </Badge>
    </Stack>
  )
}

export default CartIcon