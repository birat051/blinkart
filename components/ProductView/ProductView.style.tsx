import styled from "styled-components";

export const ProductContainer =styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 0.2px solid grey;
    cursor: pointer;
`

export const ProductImage =styled.div`
    margin-right: 1rem;
    img{
        width: 100px;
        height: 150px;
        object-fit: contain;
    }
    @media screen and (min-width: 600px){
        min-width: 250px;
        img{
        width: 200px;
        height: 300px;
        object-fit: contain;
        }
    }
`

export const ProductSpecification = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Sans:wght@400;500&display=swap');
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 4;
    h1
    {
        color: black;
        font-size: 1em;
        font-family: 'Inter',sans-serif;
        font-weight: 600;
        margin-bottom: 1.25rem;
    }
    p
    {
        color: black;
        font-size: 0.8em;
        font-family: 'Noto Sans',sans-serif;
        font-weight: 400;
        margin-bottom: 0.5rem;
    }
    p span{
      color  : grey;
      margin-right: 10px;
    }
`

export const PriceView=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;500;600display=swap');
    flex: 2;
    h2{
        font-family: 'Inter',sans-serif;
        color: black;
        font-weight: 700;
        font-size: 1.25em;
        /* text-align: right; */
        /* text-align: justify; */
        text-align: left;
        margin-bottom: 0.5rem;
    }
    p{
        font-family: 'Inter',sans-serif;
        color: #60B86C;
        font-size: 0.8em;
        font-weight: 600;
        text-align: left;
    }
    p span{
        text-decoration: line-through;
        color: grey;
        font-weight: 500;
        font-size: 1em;
        padding-right: 5px;
    }
    flex: 2;
`