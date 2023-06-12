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
`



export const SearchInput = styled.input`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Noto+Sans:wght@300;400;500&display=swap');
    font-family: 'Noto Sans', sans-serif;
    font-size: 0.75em;
    font-weight: 400;
    background-color: white;
    flex: 5;
    border: none;
    color: black;
    &:focus {
    outline: none;
  }
`