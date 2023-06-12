import styled from "styled-components";

export const LinkHeader=styled.h5`
    font-family: 'Inter', sans-serif;
    font-size: 0.9em;
    font-weight: 700;
    color: white;
    padding-left: 4px;
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
    justify-content: space-around;
    /* height: 50px; */
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
`

export const DropDownLink= styled.li`
    position: relative;
    display: block;
`