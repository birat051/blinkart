import React,{useState} from 'react'
import { CustomButton, StyledFontAwesomeIcon } from '@/styles/globals.style'
import { DropDownMenu,HorizontalDivider,MenuContainer,MenuLink, DropdownSection, StyledLinkText } from './login.style'
import { faUser,faBagShopping } from '@fortawesome/free-solid-svg-icons'

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
                    <MenuLink>
                        <li>
                            <DropdownSection href='#' justifyContent='space-between'>
                                <StyledLinkText  fontWeight={600} fontColor='black'>New Customer?</StyledLinkText>
                                <StyledLinkText fontWeight={600} fontColor='rgb(41,116,241)' textAlign='right' >Signup</StyledLinkText>
                            </DropdownSection>
                            <HorizontalDivider />
                        </li>
                        <li>
                            <DropdownSection href="/profile">
                            <StyledFontAwesomeIcon icon={faUser} width='15px' height='15px' color='#2974F1'/>
                                <StyledLinkText fontWeight={400} fontColor='black' fontFamily="'Noto Sans', sans-serif">
                                    My Profile
                                </StyledLinkText>
                            </DropdownSection>
                            <HorizontalDivider />
                        </li>
                        <li>
                            <DropdownSection href='/orders'>
                            <StyledFontAwesomeIcon icon={faBagShopping} width='15px' height='15px' color='#2974F1' textAlign='left'/>
                                <StyledLinkText  fontWeight={400} fontColor='black' fontFamily="'Noto Sans', sans-serif">
                                    Orders
                                </StyledLinkText>
                            </DropdownSection>
                        </li>
                    </MenuLink>
                </DropDownMenu>
        }
    </MenuContainer>
  )
}

export default LoginButton