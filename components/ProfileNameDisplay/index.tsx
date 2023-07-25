import React from 'react'
import { ProfileNameContainer } from './ProfileNameDisplay.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'

type profileNameProp={
    username: string
}

function ProfileNameDisplay(props:profileNameProp) {
  return (
    <ProfileNameContainer>
      <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg' />
      {/* <FontAwesomeIcon icon={faCircleUser}/> */}
      <div>
        <p>Hello,</p>
        <h1>{props.username}</h1>
      </div>
    </ProfileNameContainer>
  )
}

export default ProfileNameDisplay
