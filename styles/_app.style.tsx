import styled from "styled-components";

export const AppStyle=styled.div`
    background-color: white;
    color: black;
    height: 80vh;
    scrollbar-width: none; 
    -ms-overflow-style: none;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-left: 2rem;
    margin-right: 2rem;
    ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width:800px){
    margin-left: 1rem;
    margin-right: 1rem;
  }
`