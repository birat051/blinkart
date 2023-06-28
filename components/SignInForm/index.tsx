import React from 'react'
import { FormError, FormSpacer, LoginForm, SignupLink } from './loginForm.style'
import { CustomButton } from '@/styles/globals.style'
import { signIn } from 'next-auth/react'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from "zod"
import { useRouter } from 'next/router'

type formType={
  changeIsLoading: (value:boolean)=>void
}

const UserDetails=z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function SignInForm(props:formType) {
  const router=useRouter()
  const {register,handleSubmit,formState,reset}=useForm({resolver: zodResolver(UserDetails)})
  const {errors}=formState
  const handleOnSubmit=async (formValues:Record<string, any>)=>{
    props.changeIsLoading(true)
    const res= await signIn("credentials",{
      email:formValues.email,
      password: formValues.password,redirect:false
    })
    props.changeIsLoading(false)
    console.log(res)
    if(res?.ok!=true)
    {
      alert(res?.error)
    }
    else
    {
      router.push('/')
    }
  }
  return (
    <LoginForm onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
        <label>Email address</label>
        <input type='email' placeholder='Enter your email address' {...register('email')}></input>
        {errors.email && <FormError>{errors.email.message?.toString()}</FormError>}
        <label>Password</label>
        <input type='password' placeholder='Enter your password' {...register('password')}></input>
        {errors.password && <FormError>{errors.password.message?.toString()}</FormError>}
        <FormSpacer />
        <CustomButton backgroundColor='#FA651B' color='white' height='40px' type='submit'>Login</CustomButton>
        </div>
        <div>
          <SignupLink href='/login?signup=true'>New to Blinkart? Create an account</SignupLink>
        </div>
    </LoginForm>
  )
}

export default SignInForm