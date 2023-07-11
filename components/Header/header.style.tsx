import styled from "styled-components";



type navBarType={
    navBarOpen: boolean
}

export const LinkHeader=styled.h5`
    font-family: 'Inter', sans-serif;
    font-size: 0.9em;
    font-weight: 700;
    color: white;
    padding-left: 4px;

    @media screen and (max-width: 800px) {
      display: none;
  }
`
export const Navigation=styled.nav`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    z-index: 2;
    scrollbar-width: none; 
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
    display: none;
  }
`

export const Header=styled.header`
    display: flex;
    padding-left: 4rem;
    padding-right: 4rem;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
    align-items: center;
    width: 100%;
    background-color: rgb(41,116,241);
    scrollbar-width: none; 
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
    display: none;
    }

    @media screen and (max-width:800px)
    {
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 0rem;
        padding-right: 0rem; 
        height: 80px;
        display: grid;
        grid-template-columns: 1fr 7fr 5fr 1fr;
        grid-template-rows: 1fr 2fr 2fr 1fr;
    }
`

export const UnorderedLink=styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex: 2;
    justify-content: space-evenly;
`

export const CartLink = styled.a`
    display: flex;
    flex-direction: row;
    /* width: 50px; */
    flex: 1;
    align-items: center;
    height: 25px;
`

export const HeaderDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex:2;
    align-items: center;

    @media screen and (max-width:800px){
        grid-column-start: 2;
        grid-column-end: 3;
        justify-content: space-around;
    }
`

export const DropDownLink= styled.li`
    position: relative;
    display: block;
`

export const ImageComponent=styled.div`
     display: flex;
     justify-content: flex-start;
     align-items: center;
     /* margin-right: 1rem; */
    @media screen and (max-width:800px){
        flex: 4;
    }
`

export const MobileNav=styled.nav`
    display: none;
    @media screen and (max-width:800px){
    display: ${(props:navBarType)=>props.navBarOpen?'flex':'none'};
    width: 70%;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    transition: height 0.3s ease-in-out;
    background-color: white;
    }
`

export const MobileNavHeader=styled.div`
    background-color: rgb(41,116,241);
    color: white;
    display: grid;
    grid-template-columns: 1fr 1fr 5fr 5fr 1fr;
    height: 50px;
    grid-template-rows: repeat(3,1fr);
    h4{
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Noto+Sans:wght@300;400;500&display=swap');
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.75em;
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;
    }

    div{
        display: flex;
        flex-direction: row;
        align-items: baseline;
        /* justify-content: space-evenly; */
        flex: 1;
    }



    .mobile-nav-logo
    {
        flex: 1;
    }
`

export const DesktopLink=styled.li`
    @media screen and (max-width:800px){
        display: none;
    }
`