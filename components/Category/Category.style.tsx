import styled from "styled-components";

export const CategoryContainer=styled.div`
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display:flex;
    flex-direction: row;
    justify-content:space-evenly;
    border: 0.5px solid grey;
    background-color: white;
    /* overflow-x: scroll; */
    /* overflow-y: visible; */
    z-index: 1;
    @media screen and (max-width: 600px){
        overflow-x: scroll;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        justify-content: flex-start;
    }
    ::-webkit-scrollbar {
         display: none;
    }
   
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

    @media screen and (max-width: 800px){
        margin-right: 0.5rem;
        margin-left: 0.5rem;
    }
`

export const CategorySpacer=styled.div`
    height: 10px;
`

export const SubcategoryMenu=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500&display=swap');
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100%+1px);
    // top: 100%;
    background-color: white;
    color: black;
    z-index: 5;
    transition: 1s ease-in;
    width: 150px;
    border: solid 0.5px grey;
    border-radius: 2px;
    box-shadow: 1px 1px grey;
    div{
        padding: 5px;
        padding-left: 10px;
        border-bottom: 0.5px solid grey;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: grey;
        cursor: pointer;
    }
    div:hover{
        color: rgb(41,116,241);
        background-color: #D3D3D3;
        font-weight: 500;
    }
`