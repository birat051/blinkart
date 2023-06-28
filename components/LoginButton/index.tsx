import React,{useState} from 'react'
import { CustomButton} from '@/styles/globals.style'
import { DropDownMenu,MenuContainer } from './login.style'
import MenuLinkSection from '../MenuSection'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function LoginButton() {
  const [dropdownVisible, setdropdownVisible] = useState(false)
  const router=useRouter()
  const { signup } = router.query
  const { data: session, status } = useSession() 
  const handleMouseEnter=()=>{
    setdropdownVisible(true)
  }
  const handleMouseLeave=()=>{
    setdropdownVisible(false)
  }
  const handleLoginClick = () => {
    if(signup)
    router.push('/login')
    if (router.pathname !== '/login') {
      router.push('/login');
    }
  };
  return (
    <MenuContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {status==="unauthenticated" && <CustomButton backgroundColor='white' color='rgb(41,116,241)' onClick={handleLoginClick}>Login</CustomButton>}
        {status==="authenticated" && session && <CustomButton backgroundColor='white' color='rgb(41,116,241)' onClick={handleLoginClick}><span>{session?.user?.name}</span></CustomButton>}
        {
            dropdownVisible && 
                <DropDownMenu>
                    <MenuLinkSection />
                </DropDownMenu>
        }
    </MenuContainer>
  )
}

export default LoginButton