import styled from "styled-components";

export const CartContainer=styled.div`
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
    }
`

export const CartColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    border: 0.2px solid grey;
    
`

export const CartViewContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: 0.2px solid grey;
    padding: 1rem;
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