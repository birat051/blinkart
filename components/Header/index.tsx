import Image from "next/image"
import img from '../../public/blinkart.png'
import SearchBar from "../SearchBar"
import LoginButton from "../LoginButton"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { LinkHeader,Navigation,Header,UnorderedLink,CartLink,HeaderDiv,DropDownLink, ImageComponent, MobileNav, MobileNavHeader } from "./header.style"
import { GridIcon, GridImage, StyledFontAwesomeIcon } from "@/styles/globals.style"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useState,useRef,useEffect } from "react"
import MenuLinkSection from "../MenuSection"
import { faUser } from "@fortawesome/free-solid-svg-icons"

function PageHeader() {
  const [menuVisible, setmenuVisible] = useState(false)
  const onSearch=(query:string)=>{
    console.log('Search query is: ',query)
  }

  const mobileNavRef=useRef(null)

  const menuRef=useRef(null)

  const changeMenuVisible=()=>{
    setmenuVisible(true)
  }

  useEffect(() => {
    const handleOutsideClick=(event: MouseEvent)=>{
      if(mobileNavRef.current && !(mobileNavRef.current as any).contains(event.target as Node) && !(menuRef.current as any).contains(event.target as Node))
      setmenuVisible(false)
    }
    document.addEventListener('click',handleOutsideClick)
    return ()=>{
      document.removeEventListener('click',handleOutsideClick)
    }
  }, [])
  
  return (
    <Header>
    <HeaderDiv>
    <StyledFontAwesomeIcon icon={faBars}  width='18px' height='18px' color='white' display='none' onClick={changeMenuVisible} ref={menuRef}/>
    <ImageComponent>
    <Image src={img} alt='Blinkart logo' height='25'/>
    </ImageComponent>
    <SearchBar onSearch={onSearch}/>
    </HeaderDiv>
    <Navigation>
      <UnorderedLink>
        <DropDownLink>
          <LoginButton />
        </DropDownLink>
        <li>
        <CartLink href='/cart'>
        <StyledFontAwesomeIcon icon={faCartShopping}  width='18px' height='18px' color='white'/>
        <LinkHeader>Cart</LinkHeader>
        </CartLink>
        </li>
      </UnorderedLink>
    </Navigation>
    <MobileNav ref={mobileNavRef} navBarOpen={menuVisible}>
      <MobileNavHeader>
        <GridIcon icon={faUser} width='12px' height='12px' color='white' gridColumnStart={2} gridColumnEnd={3} gridRowStart={2} gridRowEnd={3}/>
        <h4>Login & Signup</h4>
        <GridImage src={img} placeholder='blur' alt='Blinkart logo' height='18' className="mobile-nav-logo" gridColumnStart={4} gridColumnEnd={5} gridRowStart={2} gridRowEnd={3}/>
        
      </MobileNavHeader>
      <MenuLinkSection />
    </MobileNav>
    </Header>
    )
}

export default PageHeader