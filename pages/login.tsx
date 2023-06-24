import { AppStyle } from '@/styles/_app.style'
import { LoginContainer, LoginFeature } from '@/styles/login.style'
import React from 'react'
import img from '../public/blinkart_login_photo.png'
import Image from 'next/image'
import SignInForm from '@/components/SignInForm'
import {useRouter} from 'next/router'
import SignupForm from '@/components/SignupForm'

function LoginPage() {
  const {signup}=useRouter().query
  if(signup)
  console.log('Signup is true')
  else
  console.log('Signup is false')
  return (
    <AppStyle>
        <LoginContainer>
            <LoginFeature >
                <div>
                <h5>Login</h5>
                <p>Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <Image src={img} alt='Blinkart login picture' priority={false}/> 
            </LoginFeature>
            {!signup && < SignInForm />}  
            {signup && <SignupForm />} 
        </LoginContainer>
    </AppStyle>
  )
}

export default LoginPage