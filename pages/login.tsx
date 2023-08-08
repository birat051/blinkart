import { AppStyle } from '@/styles/_app.style'
import { LoginContainer, LoginFeature } from '@/styles/login.style'
import React, { useEffect, useState } from 'react'
import img from '../public/blinkart_login_photo.png'
import Image from 'next/image'
import SignInForm from '@/components/SignInForm'
import { useRouter } from 'next/router'
import SignupForm from '@/components/SignupForm'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

function LoginPage() {
  const router=useRouter()
  const { signup } = router.query
  const [isLoading, setisLoading] = useState(false)
  const changeIsLoading=(value:boolean)=>{
    setisLoading(value)
  }
  const { data: session, status } = useSession()
  useEffect(() => {
    if(status==='loading')
    {
      return
    }
    else if(status==='authenticated')
    router.push('/')
  }, [status])
  if(status==='loading')
  {
    return (
      <LoadingOverlayWrapper active={true} >
         <AppStyle>
         </AppStyle>
         </LoadingOverlayWrapper>
    )
  }
  return (
    <LoadingOverlayWrapper active={isLoading}>
    <AppStyle>
    <Head>
        {signup && <title>Signup</title>}
        {!signup && <title>Signin</title>}
      </Head>
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
