import { AddAddress } from "@/components/ManageAddresses/ManageAddresses.style";
import Link from "next/link";
import styled from "styled-components";

export const CartContainer=styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    min-height: 80vh;
    background-color: #F0F3F6;
    justify-content: stretch;
    align-items: flex-start;
    padding: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    @media screen and (max-width: 600px) {
        padding: 2rem;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
    }

`

export const CartColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border: 0.2px solid grey;
    border-radius: 2px;
    flex: 4;
    background-color: white;
    margin-right: 1rem;
    @media screen and (max-width: 600px) {
        margin-bottom: 2rem;
        flex: 2;
        margin-right: 0rem;
    }
`



export const CartViewContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;300&display=swap');
    display: flex;
    flex-direction: row;
    border-bottom: 0.2px solid grey;
    padding: 1rem;
`
export const CartProductColumn = styled.div`
    display: flex;
        flex-direction: column;
        flex: 3;
        
`

export const CartProductLink = styled(Link)`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    
            font-family: 'Inter',sans-serif;
            font-size: 1.25em;
            color: black;
            font-weight: 600;
            margin-bottom: 0.5rem;
    :hover{
       color: #2872F1;
    }
`

export const CartImageColumn=styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    img{
        width: 224px;
        height: 246px;
        object-fit: contain;
        margin-bottom: 1rem;
        @media screen and (max-width: 600px) {
       width: 112px;
       height: 123px;
    }
    }
`

export const CartQuantity = styled.div`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: grey;
    h1{
        font-size: 1.4em;
        font-family: 'Inter',sans-serif;
        font-weight: 500;
        color: black;
    }
`

export const CartPriceRow = styled.div`
display: flex;
flex-direction: row;
color: black;
align-items: baseline;
h2{
font-family: 'Inter',sans-serif;
font-size: 1em;
color: black;
font-weight: 600;
margin-right: 4px;
}
h3{
    font-family: 'Inter',sans-serif;
    font-size: 0.8em;
    color: grey;
    font-weight: 300;
    text-decoration: line-through;
    margin-right: 4px;
}
h4{
    font-family: 'Inter',sans-serif;
    font-size: 0.7em;
    color: #3D903E;
    font-weight: 600;
}
`


export const EmptyCartContainer = styled.div`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;400&display=swap');
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    /* min-height: 150px; */
    padding: 2rem;
    width: 100%;
    border: 0.2px grey;
    background-color: white;
    color: black;
    border-radius: 2px;
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1.25em;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    p{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
    }

`

export const PlaceOrderContainer=styled.div`
    display: flex;
    padding: 1rem;
    justify-content: flex-end;
    align-items: center;
`

export const CartPriceColumn = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Noto+Sans:wght@400;600&display=swap');
    border: 0.2px solid grey;
    border-radius: 2px;
    flex: 2;
    background-color: white;
    p{
        border-bottom: 0.2px solid grey;
        font-family: 'Noto Sans',sans-serif;
        font-size: 1em;
        color: grey;
        font-weight: 600;
        padding: 0.5rem;
        padding-left: 1rem;
        width: 100%;
    }
    h5{
        font-family: 'Noto Sans';
        font-weight: 600;
        color: #398E3D; 
        padding: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    div{
        /* padding: 0.5rem; */
        padding-left: 1rem;
        padding-right: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        h3{
            font-family: 'Inter',sans-serif;
            font-size: 0.9em;
            font-weight: 400;
            color: black;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
        h4{
            font-family: 'Inter',sans-serif;
            font-size: 0.9em;
            font-weight: 400;
            color: #398E3D;  
        }
        h1{
            color: black;
            font-family: 'Inter',sans-serif;
            font-size: 1em;
            font-weight: 500;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
        }
    }
`
export const PriceColumnDivider=styled.div`
    color: black;
    height: 0px;
    margin: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 0.5px dotted grey;
`

export const CartAddressContainer = styled(AddAddress)`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Noto+Sans:wght@400;500&display=swap');
    border-left: none;
    border-right: none;
    border-top: none;
    div{
        width: 100%;
        display: flex;
        justify-content: space-between;
        div{
            display: block;
            flex: 3;
            h1{
                font-family: 'Noto Sans',sans-serif;
                font-weight: 400;
                font-size: 0.75em;
                color: grey;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 0.5rem;
            }
            p{
                font-family: 'Noto Sans',sans-serif;
                font-weight: 500;
                font-size: 0.9em;
                color: black;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                span{
                    font-weight: 400;
                    font-size: 0.8em;
                }
            }
        }
        button{
            background-color: white;
            flex: 1;
            font-family: 'Inter',sans-serif;
            font-size: 0.75em;
            font-weight: 500;
            color: #2872F1;
            border: 0.2px solid grey;
            border-radius: 2px;
            padding: 0.5rem;
            cursor: pointer;
        }
    }
`