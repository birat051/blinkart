import React, { useState } from 'react'
import { AddressPopupOptions, AddressTypeView, AddressViewContainer } from './AddressView.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Address } from '@/models/address_model'

type addressViewProp = {
    address: Address
    removeAddress: (addressId:string)=>void
    editAddress:(addressId:string)=>void
}

function AddressView(props:addressViewProp) {
  const [popupVisible, setpopupVisible] = useState(false)
  const deleteAddress= async ()=>{
    try{
        const response = await fetch(`/api/address/delete?addressId=${props.address._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
      console.log('Response is: ',response.body)
      if(response.status===200)
          {
            props.removeAddress(props.address._id)
            alert('Address has been successfully deleted');
          }
      else
      {
      const errorData = await response.json();
      alert(errorData.error);
      }
    }
    catch(error){
        alert('Unexpected error occured while trying to delete address')
    }
  }
  return (
    <AddressViewContainer>
      <AddressTypeView>
        <p>
            {props.address.addressType.toUpperCase()}
        </p>
        <FontAwesomeIcon icon={faEllipsisVertical} style={{color: 'grey',cursor: 'pointer'}} onMouseOver={()=>setpopupVisible(true)}/>
        {popupVisible && <AddressPopupOptions  onMouseLeave={()=>setpopupVisible(false)}>
            <h2 onClick={()=>props.editAddress(props.address._id)}>Edit</h2>
            <h2 onClick={deleteAddress}>Delete</h2>
            </AddressPopupOptions>
        }
      </AddressTypeView>
      <h1>{props.address.name} &nbsp; {props.address.mobileNumber}</h1>
      <p>{props.address.street},{props.address.locality} - <span>{props.address.postalCode}</span></p>
    </AddressViewContainer>
  )
}

export default AddressView
