import styled from "styled-components";

export const PaymentOptionHeading=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    background-color: #2872F1;
    color: white;
    padding: 0.5rem;
    padding-left: 1rem;
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
    }
`

export const PaymentOptionContainer = styled.div`
    padding: 1rem;
`

export const PaymentOptions = styled.div.attrs((props) => ({
    className: props.className, 
  }))`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1rem;
    div{
       h1{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 500;
        color: black;
       } 
    }
    button{
        margin-top: 1rem;
    }
    &.active{
        background-color: #F5FAFE;
    }
    input[type="radio"]
    {
        margin-right: 0.5rem;
    }

`