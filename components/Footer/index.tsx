import React from 'react'
import { AddressSection, CustomFooter, FooterCopyright } from './footer.style'
import { HorizontalDivider } from '../LoginButton/login.style'

function Footer() {
  return (
    <CustomFooter>
      <AddressSection>
        <h5>Registered Office Address:</h5>
        <p>
        Blinkart Internet Private Limited,
        Buildings Brime, Begonia &
        Outer Ring Road,
        Bengaluru, 560103,
        Karnataka, India
        </p>
        </AddressSection>
        <HorizontalDivider />
       <FooterCopyright><h5> © 2022-2023 Blinkart </h5></FooterCopyright>
    </CustomFooter>
  )
}

export default Footer