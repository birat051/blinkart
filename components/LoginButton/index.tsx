import React,{useState} from 'react'
import { CustomButton, StyledFontAwesomeIcon } from '@/styles/globals.style'
import { DropDownMenu,MenuContainer } from './login.style'
import MenuLinkSection from '../MenuSection'

function LoginButton() {
  const [dropdownVisible, setdropdownVisible] = useState(false)
  const handleMouseEnter=()=>{
    setdropdownVisible(true)
  }
  const handleMouseLeave=()=>{
    setdropdownVisible(false)
  }
  return (
    <MenuContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <CustomButton backgroundColor='white' color='rgb(41,116,241)'>Login</CustomButton>
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