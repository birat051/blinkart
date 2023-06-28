import { AppStyle } from '@/styles/_app.style'
import { LoginContainer, LoginFeature } from '@/styles/login.style'
import React, { useState } from 'react'
import img from '../public/blinkart_login_photo.png'
import Image from 'next/image'
import SignInForm from '@/components/SignInForm'
import { useRouter } from 'next/router'
import SignupForm from '@/components/SignupForm'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'

function LoginPage() {
  const { signup } = useRouter().query
  const [isLoading, setisLoading] = useState(false)
  const changeIsLoading=(value:boolean)=>{
    setisLoading(value)
  }
  return (
    <LoadingOverlayWrapper active={isLoading}>
    <AppStyle>
      <LoginContainer>
        <LoginFeature>
          <div>
            {!signup && <h5>Login</h5>}
            {signup && <h5>Looks like you're new here!</h5>}
            {!signup && <p>Get access to your Orders, Wishlist and Recommendations</p>}
            {signup && <p>Signup with your email id to get started</p>}
          </div>
          <Image src={img} alt='Blinkart login picture' priority={false} />
        </LoginFeature>
        {!signup && <SignInForm changeIsLoading={changeIsLoading}/>}
        {signup && <SignupForm changeIsLoading={changeIsLoading}/>}
      </LoginContainer>
    </AppStyle>
    </LoadingOverlayWrapper>
  )
}

export default LoginPage;