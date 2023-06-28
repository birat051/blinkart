import React from 'react'
import { MenuLink,DropdownSection,StyledLinkText,HorizontalDivider, DesktopDropDownHeader } from '../LoginButton/login.style'
import { faUser,faBagShopping,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { GridIcon} from '@/styles/globals.style'
import { DesktopLink } from '../Header/header.style'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'


function MenuLinkSection() {
    const { data: session, status } = useSession()
    const router=useRouter() 
    const logoutHandler=async ()=>{
        await signOut()
    }
    const signUpHandler=()=>{
        if(router.pathname!='/login?signup=true')
        router.push('/login?signup=true')
    }
  return (
    <MenuLink>
                        {status==='unauthenticated' && <DesktopLink>
                            <DesktopDropDownHeader onClick={signUpHandler}>
                                <StyledLinkText  fontWeight={600} fontColor='black' gridColumnStart={2} gridColumnEnd={3}>New Customer?</StyledLinkText>
                                <StyledLinkText fontWeight={600} fontColor='rgb(41,116,241)' textAlign='right' gridColumnStart={3} gridColumnEnd={4}>Signup</StyledLinkText>
                            </DesktopDropDownHeader>
                            <HorizontalDivider />
                        </DesktopLink>}
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
                            {status==='authenticated' && session && <HorizontalDivider />}
                        </li>
                        {status==='authenticated' && session && <li>
                            <DropdownSection href='#' onClick={logoutHandler}>
                            <GridIcon icon={faRightFromBracket} width='15px' height='15px' color='#2974F1' gridColumnStart={2} gridColumnEnd={3}/>
                                <StyledLinkText  fontWeight={400} fontColor='black' fontFamily="'Noto Sans', sans-serif" gridColumnStart={3} gridColumnEnd={4}>
                                    Signout
                                </StyledLinkText>
                            </DropdownSection>
                        </li>}
                    </MenuLink>
  )
}

export default MenuLinkSection