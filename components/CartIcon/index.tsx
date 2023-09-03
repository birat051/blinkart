import React, { useEffect, useState } from 'react'
import {Stack,Badge} from "@mui/material"
import { ShoppingCart } from '@mui/icons-material'
import { RootState } from '@/stateManagement/store';
import { useSelector } from 'react-redux';

function CartIcon() {
  const cartItems = useSelector((state: RootState) => state.cart);
  const [quantity, setquantity] = useState(0)
  useEffect(() => {
    let itemquantity=0
    if(cartItems.items.length>0)
    {
        cartItems.items.forEach((item)=>{
            itemquantity=itemquantity+item.quantity
        })
    }
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