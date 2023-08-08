import React, { useState } from 'react'
import { ProfileForm } from './ProfilePageForm.style'
import { z } from 'zod'
import { useController, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { CustomUser } from '../AddressForm'


const UserDetails=z.object({
    firstname: z.string().min(3),
    lastname: z.string().min(1),
    email: z.string().email(),
    mobilenumber: z.string().length(10),
})

type profileFormType={
    firstName: string,
    lastName: string,
    mobileNumber: string,
    emailAddress: string
}

function ProfilePageForm(props:profileFormType) {
  const {handleSubmit,formState,control}=useForm({resolver: zodResolver(UserDetails)})
  const {errors}=formState
  let firstName=props.firstName || ''
  let lastName=props.lastName || ''
  let email=props.emailAddress || ''
  let mobileNumber=props.mobileNumber || ''
  const [isNameInput, setNameInput] = useState(false)
  const [isEmailInput, setEmailInput] = useState(false)
  const [isMobileInput,setMobileInput] = useState(false)
  const { data: session } = useSession()
  const { field: firstNameField } = useController({
    name: 'firstname',
    control,
    defaultValue: firstName
  });
  const { field: lastNameField } = useController({
    name: 'lastname',
    control,
    defaultValue: lastName
  })
  const { field: emailField } = useController({
    name: 'email',
    control,
    defaultValue: email
  });
  const { field: mobileField } = useController({
    name: 'mobilenumber',
    control,
    defaultValue: mobileNumber
  });
  const clearNameInput=()=>{
    firstNameField.onChange(firstName)
    lastNameField.onChange(lastName)
    setNameInput(false)
  }
  const clearEmailInput=()=>{
    emailField.onChange(email)
    setEmailInput(false)
  }
  const clearMobileInput=()=>{
    mobileField.onChange(mobileNumber)
    setMobileInput(false)
  }
  const onFormSubmit=async ()=>{
    const data={
        email:emailField.value,
        name: firstNameField.value+' '+lastNameField.value,
        mobileNumber: mobileField.value
    }
    console.log('data is: ',JSON.stringify(data))
    try
    {
    const response = await fetch(`/api/user/edit?userId=${(session?.user as CustomUser)?.id}`, {
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
        alert('User details has been successfully updated');
        firstName=firstNameField.value
        lastName=lastNameField.value
        email=data.email
        mobileNumber=data.mobileNumber
        clearNameInput()
        clearEmailInput()
        clearMobileInput()
        
      }
  else
  {
    const errorData = await response.json();
    alert(errorData.error);
  }
    }
    catch(error)
    {
        alert(error)
    }
  }
  const handleFirstNameChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    firstNameField.onChange(event.target.value)
  }
  const handleLastNameChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    lastNameField.onChange(event.target.value)
  }
  const handleEmailChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    emailField.onChange(event.target.value)
  }
  const handleMobileNumberChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
    mobileField.onChange(event.target.value)
  }
  return (
    <ProfileForm onSubmit={handleSubmit(onFormSubmit)}>
      <label>Personal Information {!isNameInput && <span onClick={()=>setNameInput(true)}>Edit</span>}{isNameInput && <span onClick={clearNameInput}>Cancel</span>}</label>
      <div>
        <input placeholder='First Name' disabled={!isNameInput} onChange={handleFirstNameChange} value={firstNameField.value} name='firstname'/>
        <input placeholder='Last Name' disabled={!isNameInput} onChange={handleLastNameChange} value={lastNameField.value} name='lastname'/>
      </div>
      {errors.firstname && <p>{errors.firstname.message?.toString()}</p>}
      {!errors.firstname && errors.lastname && <p>{errors.lastname.message?.toString()}</p>}
      <label>Email Address {!isEmailInput && <span onClick={()=>setEmailInput(true)}>Edit</span>}{isEmailInput && <span onClick={clearEmailInput}>Cancel</span>}</label>
      <div>
      <input placeholder='Email Address' disabled={!isEmailInput} onChange={handleEmailChange} value={emailField.value}/>
      </div>
      {errors.email && <p>{errors.email.message?.toString()}</p>}
      <label>Mobile Number {!isMobileInput && <span onClick={()=>setMobileInput(true)}>Edit</span>}{isMobileInput && <span onClick={clearMobileInput}>Cancel</span>}</label>
      <div>
      <input placeholder='Mobile Number' disabled={!isMobileInput} onChange={handleMobileNumberChange} value={mobileField.value} type='number'/>
      </div>
      {errors.mobilenumber && <p>{errors.mobilenumber.message?.toString()}</p>}
      {(isMobileInput || isEmailInput || isNameInput) && <button type='submit'>SAVE</button>}
    </ProfileForm>
  )
}

export default ProfilePageForm
