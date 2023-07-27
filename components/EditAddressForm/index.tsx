import React, { useState } from 'react'
import { AddressCancelButton, AddressFormButtons, AddressFormContainer, AddressInputRow, AddressSaveButton, AddressTypeContainer, StateDropdownContainer, StyledRadioInput } from '../AddressForm/AddressForm.style'
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { indianStates } from '@/utils/constants';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { AddressDetails } from '../AddressForm';
import { Address } from '@/models/address_model';


interface CustomUser extends User {
    id: string;
}

type addressFormProp={
    closeAddressForm: ()=>void,
    changeLoading: (value:boolean)=>void,
    address: Address,
    updateAddressData: (inputaddress:Address)=>void
}

function EditAddressForm(props:addressFormProp) {
    const { data: session } = useSession()
    const [selectedAddress, setSelectedAddress] = useState<string | null>(props.address.addressType);
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedAddress(event.target.value);
    };
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        field.onChange(event.target.value)
    };
  const {register,handleSubmit,formState,reset,control}=useForm({resolver: zodResolver(AddressDetails)})
  const {field}=useController({name:'state',control})
  const {errors}=formState
  const handleFormSubmit=async (formValues:Record<string, any>)=>{
    const data={
        name: formValues.name,
        mobileNumber: formValues.mobileNumber,
        postalCode: formValues.pincode,
        locality: formValues.locality,
        street: formValues.address,
        city: formValues.city,
        state: formValues.state,
        addressType: formValues.addressType,
        isDefault: false,
        userId: (session?.user as CustomUser)?.id
    }
    console.log('Data is: ',data)
    props.changeLoading(true)
    try{
        const response = await fetch(`/api/address/edit?addressId=${props.address._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      console.log('Response is: ',response.body)
      if(response.status===200)
          {
            const data=await response.json()
            props.changeLoading(false)
            alert('Address has been successfully updated');
            props.updateAddressData(data)
            props.closeAddressForm()
          }
      else
      {
        const errorData = await response.json();
        alert(errorData.error);
      }
    }
    catch(error){
        alert('Unexpected error occured while trying to update address')
    }
    props.changeLoading(false)
  }
  return (
    <AddressFormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>ADD A NEW ADDRESS</h2>
      <AddressInputRow>
        <div>
        <input placeholder='Name' type='text' {...register('name')} defaultValue={props.address.name}/>
        {errors.name && <p>{errors.name.message?.toString()}</p>}
        </div>
        <div>
        <input placeholder='10-digit mobile number' type='number' maxLength={10} {...register('mobileNumber')} defaultValue={props.address.mobileNumber}/>
        {errors.mobileNumber && <p>{errors.mobileNumber?.message?.toString()}</p>}
        </div>
      </AddressInputRow>
      <AddressInputRow>
      <div>
      <input placeholder='Pincode' type='number' maxLength={6} {...register('pincode')} defaultValue={props.address.postalCode}/>
      {errors.pincode && <p>{errors.pincode?.message?.toString()}</p>}
      </div>
      <div>
      <input placeholder='Locality' type='type' {...register('locality')} defaultValue={props.address.locality}/>
      {errors.locality && <p>{errors.locality?.message?.toString()}</p>}
      </div>
      </AddressInputRow>
      <textarea placeholder='Address(Area and Street)' {...register('address')} defaultValue={props.address.street}/>
      {errors.address && <p>{errors.address?.message?.toString()}</p>}
      <AddressInputRow>
      <div>
        <input placeholder='City/Town/District' type='text' {...register('city')} defaultValue={props.address.city}/>
        {errors.city && <p>{errors.city?.message?.toString()}</p>}
        </div>
        <div>
        <StateDropdownContainer onChange={handleDropdownChange} id="state-dropdown" name="state" value={field.value}>
      <option value="">--State--</option>
      {indianStates.map((state, index) => (
        <option key={index} value={state}>
          {state}
        </option>
      ))}
    </StateDropdownContainer>
        {errors.state && <p>{errors.state?.message?.toString()}</p>}
        </div>
      </AddressInputRow>
      <label>Address Type</label>
      <AddressTypeContainer>
      <label>
        <StyledRadioInput
          {...register('addressType')}
          type="radio"
          value="home"
          checked={selectedAddress === 'home'}
          onChange={handleAddressChange}
        />
        Home
      </label>
      <label>
        <StyledRadioInput
          {...register('addressType')}
          type="radio"
          name="addressType"
          value="work"
          checked={selectedAddress === 'work'}
          onChange={handleAddressChange}
        />
        Work
      </label>
    </AddressTypeContainer>
      {errors.addressType && <p>{errors.addressType?.message?.toString()}</p>}
      <AddressFormButtons>
        <AddressSaveButton type='submit'>SAVE</AddressSaveButton>
        <AddressCancelButton onClick={()=>props.closeAddressForm()}>CANCEL</AddressCancelButton>
      </AddressFormButtons>
    </AddressFormContainer>
  )
}

export default EditAddressForm
