import React from 'react'
import { MenuLink,DropdownSection,StyledLinkText,HorizontalDivider, DesktopDropDownHeader } from '../LoginButton/login.style'
import { faUser,faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { GridIcon} from '@/styles/globals.style'
import { DesktopLink } from '../Header/header.style'


function MenuLinkSection() {
  return (
    <MenuLink>
                        <DesktopLink>
                            <DesktopDropDownHeader>
                                <StyledLinkText  fontWeight={600} fontColor='black' gridColumnStart={2} gridColumnEnd={3}>New Customer?</StyledLinkText>
                                <StyledLinkText fontWeight={600} fontColor='rgb(41,116,241)' textAlign='right' gridColumnStart={3} gridColumnEnd={4}>Signup</StyledLinkText>
                            </DesktopDropDownHeader>
                            <HorizontalDivider />
                        </DesktopLink>
                        <li>
                            <DropdownSection href="/profile">
                            <GridIcon icon={faUser} width='15px' height='15px' color='#2974F1' gridColumnStart={2} gridColumnEnd={3}/>
                                <StyledLinkText fontWeight={400} fontColor='black' fontFamily="'Noto Sans', sans-serif" gridColumnStart={3} gridColumnEnd={4}>
                                    My Account
                                </StyledLinkText>
                            </DropdownSection>
                            <HorizontalDivider />
                        </li>
                        <li>
                            <DropdownSection href='/orders'>
                            <GridIcon icon={faBagShopping} width='15px' height='15px' color='#2974F1' gridColumnStart={2} gridColumnEnd={3}/>
                                <StyledLinkText  fontWeight={400} fontColor='black' fontFamily="'Noto Sans', sans-serif" gridColumnStart={3} gridColumnEnd={4}>
                                    My Orders
                                </StyledLinkText>
                            </DropdownSection>
                        </li>
                    </MenuLink>
  )
}

export default MenuLinkSection