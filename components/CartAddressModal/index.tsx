import React from 'react'
import { CartAddressRow, CartModalContainer } from './CartAddressModal.style'
import { Address } from '@/models/address_model'
import { StyledRadioInput } from '../AddressForm/AddressForm.style'


type cartModalProp={
  addressList: Address[]
  selectedIndex: number
  changeIndex: (value:number,address:Address)=>void
}

function CartAddressModal(props:cartModalProp) {
  return (
    <CartModalContainer>
      <h1>Select Delivery Address</h1>
      {props.addressList.map((address,index)=>{
        return (
          <CartAddressRow key={address._id+index}>
            <StyledRadioInput
            type="radio"
            value={index}
            checked={props.selectedIndex === index}
            onClick={()=>props.changeIndex(index,address)}
            style={{marginRight: '8px'}}
            readOnly
            />
            <div>
              <p>{address.name},{address.postalCode}<span>{address.addressType.toUpperCase()}</span></p>
              <h1>{address.street},{address.locality}</h1>
            </div>
          </CartAddressRow>
        )
      })}
    </CartModalContainer>
  )
}

export default CartAddressModal
