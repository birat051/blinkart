import { OrderView } from "@/styles/orderconfirmation.style";
import styled from "styled-components";

export const OrderPageListView=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    flex: 6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    button
    {
        color: rgb(41,116,241);
        font-size: 0.8em;
        padding: 0.5rem;
        background-color: white;
        font-family: 'Inter',sans-serif;
        font-weight: 500;
        border: none;
        border-radius: 2px;
        cursor: pointer;
    }
`

export const OrderContainer= styled.div`
    background-color: white;
    border: 0.1px solid grey;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 1rem;
    border-radius: 2px;
    width: 100%;
    cursor: pointer;
    :hover{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`

export const OrderElement=styled(OrderView)`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Noto+Sans:wght@400;600&display=swap');
    h1{
        font-weight: 400;
        font-size: 0.8em;
    }
    h2{
        font-weight: 400;
        span{
            font-weight: 500;
            font-size: 0.8em;
        }
    }
    border-bottom: none;
    width: 100%;
`