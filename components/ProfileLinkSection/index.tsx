import React, { useEffect, useState } from 'react'
import { ProfileHeading, ProfileIcons, ProfileLinkContainer, ProfileLinkRow, ProfileLinks, ProfileSubLinks } from './ProfileLinkSection.style'
import { faBagShopping, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'

type profileLinkProp = {
  activeLink: string[] | string
}


function ProfileLinkSection(props:profileLinkProp) {
  const [currentLink, setcurrentLink] = useState('')
  useEffect(() => {
    let link=''
    if(Array.isArray(props.activeLink))
    props.activeLink.forEach((element:string) => {
      link= link+ '/' + element
    });
    else
    link=props.activeLink
    // console.log('Link value is: ',link)
    setcurrentLink(link)
  }, [props.activeLink])
  
  return (
    <ProfileLinkContainer>
      <ProfileLinkRow>
        {/* <FontAwesomeIcon icon={faBagShopping} style={{color: '#2872F1',paddingRight: '15px'}} size='lg'/> */}
        <ProfileIcons icon={faBagShopping} />
        <ProfileLinks href='/orders'>MY ORDERS</ProfileLinks>
      </ProfileLinkRow>
      <ProfileLinkRow>
        {/* <FontAwesomeIcon icon={faBagShopping} style={{color: '#2872F1',paddingRight: '15px'}} size='lg'/> */}
        <ProfileIcons icon={faUser} />
        <ProfileHeading>ACCOUNT SETTINGS</ProfileHeading>
      </ProfileLinkRow>
      <ProfileLinkRow className={currentLink==='/info'?'active':''}>
        <ProfileSubLinks href='/profile/info' className={currentLink==='/info'?'active':''}>Profile Information</ProfileSubLinks>
      </ProfileLinkRow>
      <ProfileLinkRow className={currentLink==='/addresses'?'active':''}>
        <ProfileSubLinks href='/profile/addresses' className={currentLink==='/addresses'?'active':''} passHref>Manage Addresses</ProfileSubLinks>
      </ProfileLinkRow>
      <ProfileLinkRow>
        <ProfileIcons icon={faPowerOff} />
        <ProfileLinks href='/api/auth/signout'>LOGOUT</ProfileLinks>
      </ProfileLinkRow>
    </ProfileLinkContainer>
  )
}

export default ProfileLinkSection
