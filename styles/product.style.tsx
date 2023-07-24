import Link from "next/link";
import styled from "styled-components";

export const ProductPageContainer= styled.div`
    display: flex;
    flex-direction: row;
    padding: 2rem;
    justify-content: space-around;
    align-items: flex-start;
    min-height: 80vh;
    background-color: white;
    @media screen and (max-width: 600px){
        flex-direction: column;
    }
`

export const ProductImageContainer = styled.div`
    width: 100%;
    aspect-ratio: 2/3;
    border: 0.2px solid grey;
    position: relative;
    margin-bottom: 1rem;
`

export const ProductImage = styled.img.attrs((props) => ({
    className: props.className, 
  }))`
    display: none;
    &.active{
    display: flex;
    width: 100%;
    height: 100%;
    transition: 0.5s ease-in-out;
    object-fit: contain;
    }
`

export const ProductDetailsContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;700;400&display=swap');
    display: flex;
    flex-direction: column;
    flex: 4;
    h4{
        color: #398F3C;
        font-size: 0.8em;
        font-family: 'Inter',sans-serif;
        font-weight: 600;
    }
    h2{
        font-family: 'Inter',sans-serif;
        font-weight: 600;
        font-size: 1.25em;
        color: black;
        margin-bottom: 0.5rem;
    }
    h5{
        margin-bottom: 0.5rem;
        font-size: 0.8em;
        font-family: 'Inter',sans-serif;
        font-weight: 600;
        color: grey;
    }
    ul 
    {
        margin-bottom: 1rem;
        list-style-position: inside;
    li{
        color: black;
        font-weight: 400;
        margin-bottom: 0.25rem;
        font-size: 0.8em;
        font-family: 'Inter',sans-serif;
    }
    }
    p{
        margin-bottom: 1rem;
        font-size: 0.8em;
        font-family: 'Inter',sans-serif;
        font-weight: 400;
        color: black;
    }
    h3{
        margin-bottom: 0.5rem;
        color: rgb(41,116,241);
        font-size: 0.8em;
        font-family: 'Inter',sans-serif;
        font-weight: 600;
    }
`

export const ProductLinkContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
    display: flex;
    margin-bottom: 0.5rem;
    align-items: baseline;
    height: fit-content;
    h2{
    font-family: 'Inter',sans-serif;
    font-size: 0.7em;
    color: gray;
    font-weight: 400;
    margin-bottom: 0rem;
    }
`

export const ProductLink = styled(Link)`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
    font-family: 'Inter',sans-serif;
    font-size: 0.7em;
    color: gray;
    font-weight: 400;
    :hover{
        color: rgb(41,116,241);
    }
`

export const ProductPriceContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: baseline;
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1.75em;
        font-weight: 600;
        color: black;
        padding-right: 8px;
    }
    span{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        color: grey;
        font-weight: 400;
        text-decoration: line-through;
        padding-right: 8px;
    }
    h4{
        color: #398F3C;
        font-size: 1em;
        font-family: 'Inter',sans-serif;
        font-weight: 600;
    }
`

export const ProductColumnLeft=styled.div`
    display: flex;
    flex: 2;
    margin-right: 1rem;
    flex-direction: column;
    align-items: stretch;
    max-width: 400px;
    margin-bottom: 2rem;
`

export const ProductButtonContainer=styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: stretch;
    div{
        width: 20px;
    }
`

export const AddToCart=styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    flex: 2;
    background-color: #FE9F00;
    padding: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-family: 'Inter',sans-serif;
    font-size: 0.75em;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span{
        padding-right: 5px;
    }
`

export const BuyNow= styled(AddToCart)`
    background-color: #FA651B;
`