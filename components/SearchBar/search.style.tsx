import styled from "styled-components";




export const Search=styled.div`
    width: 500px;
    padding: 0.5rem;
    padding-left: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
    background-color: white;
    border: 1px solid white;
    border-radius: 2px;

    @media screen and (max-width: 600px){
      display: none;
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