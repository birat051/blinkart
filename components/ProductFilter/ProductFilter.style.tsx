import Link from "next/link";
import styled from "styled-components";

export const FilterContainer=styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0.5rem;
    border-radius: 1px;
    border: 0.2px solid grey;
    border-bottom: none;
    margin-right: 0px;
    @media screen and (max-width: 600px){
        display: none;
    }
`

export const FilterView = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Sans:wght@600;500&display=swap');
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    h1{
        font-family: 'Noto Sans',sans-serif;
        font-size: 1em;
        font-weight: 600;
        color: black;
    }
    h2{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 600;
        color: black;
    }
    h3{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.6em;
        font-weight: 500;
        color: black;
        margin-bottom: 4px;
    }
    div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    input[type="range"]{
        accent-color: rgb(41,116,241);
        margin-top: 4px;
        margin-bottom: 4px;
        background-color: white;
        ::-webkit-slider-thumb{
            color: rgb(41,116,241);
    }
    }
    input[type="checkbox"]
    {
        height: 14px;
        width: 14px;
    }
    input[type="checkbox"]:checked
    {
        accent-color: rgb(41,116,241);
    }
    border-bottom: 0.2px solid grey;
    button{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        color: white;
        background-color: rgb(41,116,241);
        padding: 0.5rem;
        border-radius: 2px;
        border: none;
        cursor: pointer;
    }
`

export const ClearAllLink=styled(Link)`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    font-family: 'Inter',sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: rgb(41,116,241);
`

export const CategoryNavLink= styled(Link)`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap');
    font-family: 'Noto Sans',sans-serif;
    font-size: 0.8em;
    font-weight: 500;
    color: grey;
    margin-right: 4px;
`

export const PriceView = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500&display=swap'); 
    display: flex;
    justify-content: space-between;
    h2{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.6em;
        font-weight: 500;
        color: black;
    }
`