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
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

function PageHeader() {
  const [menuVisible, setmenuVisible] = useState(false)
  const onSearch=(query:string)=>{
    console.log('Search query is: ',query)
  }
  const { data: session, status } = useSession()

  const mobileNavRef=useRef(null)

  const menuRef=useRef(null)

  const router=useRouter()

  const {signup} = router.query

  const changeMenuVisible=()=>{
    setmenuVisible(true)
  }

  const handleLoginClick = () => {
    if(signup)
    router.push('/login')
    if (router.pathname !== '/login') {
      router.push('/login');
    }
  };

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
    <Image src={img} alt='Blinkart logo' height='25' onClick={()=>router.push('/')} style={{cursor: 'pointer'}} priority={true}/>
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
      {status==='unauthenticated' && <MobileNavHeader onClick={handleLoginClick}>
        <GridIcon icon={faUser} width='12px' height='12px' color='white' gridcolumnstart={2} gridcolumnend={3} gridrowstart={2} gridrowend={3}/>
        <h4>Login & Signup</h4>
        <GridImage src={img} placeholder='blur' alt='Blinkart logo' height='18' className="mobile-nav-logo" gridcolumnstart={4} gridcolumnend={5} gridrowstart={2} gridrowend={3}/>
      </MobileNavHeader>}
      <MenuLinkSection />
    </MobileNav>
    </Header>
    )
}

export default PageHeader