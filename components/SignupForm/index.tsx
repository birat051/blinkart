import React from 'react'
import { FormError, FormSpacer, LoginForm, SignupLink } from '../SignInForm/loginForm.style'
import { CustomButton } from '@/styles/globals.style'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from "zod"

type formType={
  changeIsLoading: (value:boolean)=>void
}


const UserDetails=z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmpass: z.string().min(8),
})
.refine((data) => data.password === data.confirmpass, {
  message: "Password doesn't match",
  path: ["confirmpass"]
});

function SignupForm(props:formType) {
  const {register,handleSubmit,formState,reset}=useForm({resolver: zodResolver(UserDetails)})
  const {errors}=formState
  const handleOnSubmit=async (formValues:Record<string, any>)=>{

    console.log('Form Values are',formValues)
    const url = '/api/signup'; // The URL of your signup API endpoint
  const data = {
    name: formValues.name,
    email: formValues.email,
    password: formValues.password
  };
  try {
    props.changeIsLoading(true)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log('Response is: ',response)
    props.changeIsLoading(false)
    if(response.ok)
    {
      reset()
      alert('You account has been successfully created, you can login now!');
    }
    else if(response.status===409)
    alert('User with this email id already exists');
    props.changeIsLoading(false)
  } catch (error) {
    console.error('Error:', error);
  }
  }
  return (
    <LoginForm onSubmit={handleSubmit(handleOnSubmit)}>
       <div>
        <label>Name</label>
        <input type='text' placeholder='Enter your name' {...register('name')}></input>
        {errors.name && <FormError>{errors.name.message?.toString()}</FormError>}
        <label>Email address</label>
        <input type='email' placeholder='Enter your email address' {...register('email')}></input>
        {errors.email && <FormError>{errors.email.message?.toString()}</FormError>}
        <label>Password</label>
        <input type='password' placeholder='Enter your password' {...register('password')}></input>
        {errors.password && <FormError>{errors.password.message?.toString()}</FormError>}
        <label>Confirm Password</label>
        <input type='password' placeholder='Re-enter your password' {...register('confirmpass')}></input>
        {errors.confirmpass && (
        <FormError>{errors.confirmpass.message?.toString()}</FormError>)}
        <FormSpacer />
        <CustomButton backgroundcolor='#FA651B' color='white' height='40px' type='submit'>Register</CustomButton>
        </div>
        <div>
          <SignupLink href='/login'>Existing User? Login</SignupLink>
        </div>
    </LoginForm>
  )
}

export default SignupForm