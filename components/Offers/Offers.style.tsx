import styled from "styled-components";

export const OfferContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    padding-left: 1rem;
    padding-right: 10px;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border: 0.5px solid grey;
    border-radius: 2px;
    h1{
        flex: 2;
        font-family: 'Inter',sans-serif;
        font-size: 1.5em;
        font-weight: 600;
        text-align: center;
    }
`

export const OfferList=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex: 8;
    overflow-x: scroll;
    ::-webkit-scrollbar{
        display: none;
    }
`

export const OfferBlock=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&display=swap');
    max-width: 150px;
    cursor: pointer;
    /* max-height: 150px; */
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    font-family: 'Noto Sans',sans-serif;
    white-space: nowrap;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 1rem;
    margin-right: 1rem;
    img{

        height: 200px;
        border: 0.5px solid white;
        object-fit: contain;
        margin-bottom: 10px;
    }
    h1{
        font-size: 0.8em;
        font-weight: 600;
        color: black;
        margin-bottom: 10px;
        text-align: center;
    }
    h2{
        font-size: 1em;
        font-weight: 500;
        color: #398F3C;
        margin-bottom: 10px;
        text-align: center;
    }
    h3{
        color: #8F8E8F;
        font-weight: 400;
        font-size: 0.6em;
        text-align: left;
        align-items: flex-start;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`