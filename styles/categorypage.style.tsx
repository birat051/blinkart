import Link from "next/link";
import styled from "styled-components";

export const CategoryPageContainer= styled.div`
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: flex-start;    
    min-height: 80vh;
    background-color: white;
`

export const ProductListView =styled.div`
    margin: 0.5rem;
    border: 0.2px solid grey;
    border-radius: 1px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

export const ProductColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    align-items: stretch;
    justify-content: stretch;
`

export const PageNumberRow = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
    display: flex;
    border: 0.5px solid grey;
    border-radius: 1px;
    margin: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: black;
    p
    {
        color: black;
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        flex: 2;
    }
`

export const PageNumberContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap');
    display: flex;
    flex: 4;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    button{
        cursor: pointer;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 600;
      color: #2872F1;
      border: none;
      background-color: white;
    }
`

export const PageSpacer = styled.div`
    flex: 2;
`

export const PageLink= styled(Link).attrs((props) => ({
    className: props.className, 
  }))`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap');
    color: black;
    font-family: 'Noto Sans',sans-serif;
    font-size: 0.8em;
    font-weight: 600;
    &.active{
        color: white;
        background-color: #2872F1;
        border-radius: 50%;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

