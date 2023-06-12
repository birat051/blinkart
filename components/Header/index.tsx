import Image from "next/image"
import img from '../../public/blinkart.png'
import SearchBar from "../SearchBar"
import LoginButton from "../LoginButton"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { LinkHeader,Navigation,Header,UnorderedLink,CartLink,HeaderDiv,DropDownLink } from "./header.style"
import { StyledFontAwesomeIcon } from "@/styles/globals.style"

function PageHeader() {
  const onSearch=(query:string)=>{
    console.log('Search query is: ',query)
  }
  return (
    <Header>
    <HeaderDiv>
    <Image src={img} placeholder='blur' alt='Blinkart logo' height='25'/>
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
    </Header>)
}

export default PageHeader