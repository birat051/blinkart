import styled from "styled-components";

export const CategoryContainer=styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    display:flex;
    flex-direction: row;
    justify-content:space-evenly;
    border: 0.5px solid grey;
    background-color: white;
    overflow-x: scroll;
`

export const CategoryBlock=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Noto+Sans:wght@300;400;500&display=swap');
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    h1{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.75em;
        font-weight: 500;
    }
`

export const CategorySpacer=styled.div`
    height: 10px;
`