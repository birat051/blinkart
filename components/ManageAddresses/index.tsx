import { Address } from '@/models/address_model'
import React, { useState } from 'react'
import { AddAddress, ManageAddressContainer } from './ManageAddresses.style'
import AddressForm from '../AddressForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

type addressProp={
    addresses: Address[],
    changeLoading: (value:boolean)=>void
}

function ManageAddresses(props:addressProp) {
  const [addressForm, setaddressForm] = useState(false)
  const changeAddressFormState=()=>{
    setaddressForm(!addressForm)
  }
  return (
    <ManageAddressContainer>
        <h1>Manage Addresses</h1>
        {!addressForm && <AddAddress onClick={changeAddressFormState}>
            <FontAwesomeIcon icon={faAdd} />
            <h2>ADD A NEW ADDRESS</h2>
        </AddAddress>}
        {
            addressForm && <AddressForm closeAddressForm={changeAddressFormState} changeLoading={props.changeLoading} isAddressEmpty={props.addresses.length===0}/>
        }
    </ManageAddressContainer>
  )
}

export default ManageAddresses
