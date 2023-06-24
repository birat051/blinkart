import React from 'react'
import { FormSpacer, LoginForm, SignupLink } from './loginForm.style'
import { CustomButton } from '@/styles/globals.style'
 

function SignInForm() {
  return (
    <LoginForm>
        <div>
        <label>Email address</label>
        <input type='email' placeholder='Enter your email address'></input>
        <label>Password</label>
        <input type='password' placeholder='Enter your password'></input>
        <FormSpacer />
        <CustomButton backgroundColor='#FA651B' color='white' height='40px'>Login</CustomButton>
        </div>
        <div>
          <SignupLink href='/login?signup=true'>New to Blinkart? Create an account</SignupLink>
        </div>
    </LoginForm>
  )
}

export default SignInForm