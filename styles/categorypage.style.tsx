import Link from "next/link";
import styled from "styled-components";

export const CategoryPageContainer= styled.div.attrs((props) => ({
    className: props.className, 
  }))`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: flex-start;    
    min-height: 80vh;
    background-color: white;
    &.empty{
        justify-content: center;
        align-items: center;
    p
    {
        color: black;
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
    }
    }
`

export const ProductListView =styled.div`
    margin: 0.5rem;
    border: 0.2px solid grey;
    border-radius: 2px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 0rem;
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

export const PageLinkButton= styled.button.attrs((props) => ({
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
export const SortProductContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding-top: 0.5rem;
    border: 0.1px solid grey;
    margin: 0.5rem;
    margin-bottom: 0rem;
    border-bottom: none;
    border-radius: 2px;
    /* overflow-x: scroll; */
    ul{
        /* overflow-x: scroll; */
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        list-style-type: none;
    }
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 600;
        padding-bottom: 0.5rem;
        color: black;
        padding-right: 1rem;
        padding-left: 1rem;
    }
`

export const FilterLinks=styled.li.attrs((props) => ({
    className: props.className, 
  }))`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        padding-bottom: 0.25rem;
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        padding-right: 1rem;
        /* padding-left: 1rem; */
        color: black;
        cursor: pointer;
        &.active
        {
            color: #2973F1;
            padding-bottom: 0rem;
            font-weight: 600;
        }
        &.active::after
        {
            content: '';
            display: block;
            width: 100%;
            height: 3px;
            background-color: #2973F1;
            margin-top: 0.3rem;
        }
`