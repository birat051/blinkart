import { Address } from '@/models/address_model'
import React, { useState } from 'react'
import { AddAddress, ManageAddressContainer } from './ManageAddresses.style'
import AddressForm from '../AddressForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import AddressView from '../AddressView'
import EditAddressForm from '../EditAddressForm'

type addressProp={
    addresses: Address[],
    changeLoading: (value:boolean)=>void
}

function ManageAddresses(props:addressProp) {
  const [addressForm, setaddressForm] = useState(false)
  const [addressList, setaddressList] = useState(props.addresses)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const changeAddressFormState=()=>{
    setaddressForm(!addressForm)
  }
  const removeAddress=(addressId:string)=>{
    const newAddressList=addressList.filter((address)=>address._id!=addressId)
    setaddressList(newAddressList)
  }
  const editAddress=(addressId:string)=>{
    setSelectedAddress(addressId)
  }
  const closeAddressForm=()=>{
    setSelectedAddress(null)
  }
  const updateAddressData=(inputaddress:Address)=>{
    let newAddressList=addressList.filter((address)=>address._id!=inputaddress._id)
    newAddressList.push(inputaddress)
    setaddressList(newAddressList)
  }
  const addAddressData=(address:Address)=>{
    const newList=[...addressList,address]
    setaddressList(newList)
  }
  return (
    <ManageAddressContainer>
        <h1>Manage Addresses</h1>
        {!addressForm && <AddAddress onClick={changeAddressFormState} >
            <FontAwesomeIcon icon={faAdd} />
            <h2>ADD A NEW ADDRESS</h2>
        </AddAddress>}
        {
            addressForm && <AddressForm closeAddressForm={changeAddressFormState} changeLoading={props.changeLoading} isAddressEmpty={props.addresses.length===0} setDefaultAddress={addAddressData}/>
        }
        {addressList.map((address,index)=>{
          if (address._id!=selectedAddress)
          return(<AddressView key={address.street+index} address={address} removeAddress={removeAddress} editAddress={editAddress}/>)
          return (
              <EditAddressForm key={index+address._id} closeAddressForm={closeAddressForm} address={address} changeLoading={props.changeLoading} updateAddressData={updateAddressData}/>
          )
        })}
    </ManageAddressContainer>
  )
}

export default ManageAddresses
