import styled from "styled-components";

export const OrderConfirmation=styled.div`
    background-color: #F1F2F6;
    min-height: 80vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    @media screen and (min-width: 1000px){
        align-items: center;
    }
`

export const OrderPlacedContainer=styled.div`
    /* padding: 1rem; */
    display: flex;
    justify-content: space-between;
    background-color: white;
    /* border: 0.2px solid grey; */
    border-radius: 2px;
    margin-bottom: 1rem;
    @media screen and (max-width: 700px){
        flex-direction: column;
    }
    @media screen and (min-width: 1000px){
        width: 70%;
    }
`

export const OrderPlacedLeftColumn=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Noto+Sans:wght@400;600&display=swap');
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    img{
        object-fit: cover;
        margin-right: 1rem;
        width: 80px;
        height: 80px;
    }
    div{
        h1{
            color: rgb(41,116,241);
            font-family: 'Inter',sans-serif;
            font-size: 1.25em;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        p{
            font-family: 'Noto Sans',sans-serif;
            font-size: 0.9em;
            font-weight: 400;
            color: black;
            span{
                font-weight: 600;
            }
        }
    }
    padding: 1rem;
    border-right: 0.1px solid grey;
    @media screen and (max-width: 700px){
        border-right: none;
        border-bottom: 0.1px solid grey;
    }
    @media screen and (min-width: 1000px){
        width: 70%;
    }
`

export const OrderPlacedRightColumn=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Noto+Sans:wght@400;600&display=swap');
    display: flex;
    flex: 1;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    div{
     h1{
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-size: 1em;
        font-weight: 600;
        margin-bottom: 0.5rem;
     }
     p{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        color: black;
        margin-bottom: 0.5rem;
    }
    button{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 500;
        color: white;
        padding: 0.5rem;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        background-color: #2872F1;
        border: none;
        border-radius: 2px;
        cursor: pointer;
    }
     margin-right: 1rem;
    }
    img{
        object-fit: contain;
        width: 80px;
        height: 80px;
    }
`

export const DeliveryAddressContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;500&display=swap');
    background-color: white;
    padding: 1rem;
    border-radius: 2px;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
        h1{
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-size: 1em;
        font-weight: 600;
        margin-bottom: 0.5rem;
        }
    h2{
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    p{
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.75em;
        font-weight: 400;
        margin-bottom: 0.5rem;
        span{
            font-weight: 600;
            font-size: 1em;
        }
    }
    
    @media screen and (min-width: 1000px){
        width: 70%;
    }
`

export const OrderListView=styled.div`
    background-color: white;
    border-radius: 2px;
    @media screen and (min-width: 1000px){
        width: 70%;
    }
`

export const OrderView=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;400&family=Noto+Sans:wght@400;600&display=swap');
    padding: 1rem;
    border-bottom: 0.1px solid grey;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 4fr;
    justify-content: space-evenly;
    align-items: flex-start;
    column-gap: 0.5rem;
    img{
        height: 150px;
        width: 100px;
        object-fit: contain;
        flex: 2;
        grid-column: 1/2;
    }
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 500;
        color: black;
        grid-column: 2/3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        span{
            display: none;
            font-family: 'Inter',sans-serif;
            font-size: 0.8em;
            font-weight: 500;
        }
    }
    h2{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 600;
        color: black; 
        flex: 1;
        text-align: left;
        grid-column: 4/5;
        span{
            font-size: 0.7em;
            color: #398F3C;
            font-weight: 400;
        }
    }
    div{
        grid-column: 3/4;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        color: black;
        display: flex;
        width: 100%;
    }
    @media screen and (max-width: 600px){
        grid-template-columns: 1fr 2fr 2fr 2fr;
    }
`

export const TotalPriceView=styled(OrderView)`
    border-bottom: none;
`