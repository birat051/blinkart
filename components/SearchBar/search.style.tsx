import styled from "styled-components";


export const SearchContainer=styled.div`
  position: relative;
  display: block;
  flex: 2;
  @media screen and (max-width: 1000px){
      grid-row: 3;
      grid-column: 2/3;
      width: 100%;
    }
`

export const Search=styled.div`
    /* width: 500px; */
    padding: 0.5rem;
    padding-left: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
    background-color: white;
    border: 1px solid white;
    border-radius: 2px;
    position: relative;
    flex: 3;
    @media screen and (max-width: 1000px){
      width: 100%;
      padding: 0rem;
    }
`



export const SearchInput = styled.input`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400&display=swap');
    font-family: 'Noto Sans', sans-serif;
    font-size: 0.75em;
    font-weight: 400;
    background-color: white;
    flex: 5;
    border: none;
    color: black;
    &:focus {
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 880px){
      flex: 2;
      padding-left: 4px;
    }  
`

export const SearchResultContainer= styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 2px;
  border: none;
  justify-content: flex-start;
  align-items: stretch;
  position: absolute;
  width: 100%;
  left: 0%;
  top: calc(120%+10px);
  z-index: 2;
  cursor: pointer;
  border: 0.1px solid grey;
  border-radius: 4px;
  div{
    padding: 0.5rem;
    display: flex;
    justify-content: flex-start;
    img{
      width: 50px;
      height: 75px;
      object-fit: contain;
      margin-right: 0.5rem;
    }
    p{
      font-family: 'Inter',sans-serif;
      font-size: 1em;
      font-weight: 500;
      color: grey;
    }
    :hover{
      background-color: #F5FBFF;
      p{
        color: #2872F1;
      }
    }

  }
`