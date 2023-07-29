import styled from "styled-components";

export const CreditCardFormContainer= styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500&display=swap');
    padding: 1rem;
    padding-bottom: 0rem;
    background-color: #F5FAFE;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 1rem;
    input{
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        border: 0.2px solid grey;
        border-radius: 2px;
        padding: 0.5rem;
        background-color: white;
        margin-bottom: 1rem;
    }
    p{
        font-family: 'Inter',sans-serif;
        font-size: 0.75em;
        font-weight: 400;
        color: red;
        margin-bottom: 1rem;
    }
`

export const ExpiryDateContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
    /* max-width: 300px; */
    padding: 0.5rem;
    border: 0.2px solid grey;
    border-radius: 2px;
    background-color: white;
    display: flex;
    align-items: baseline;
    /* min-width: 200px; */
    width: 200px;
    justify-content: space-between;
    margin-bottom: 1rem;
    h2{
        font-family: 'Inter',sans-serif;
        font-size: 0.95em;
        color: grey;
        font-weight: 400;
        margin-right: 0.5rem;
    }
    select{
        font-family: 'Inter',sans-serif;
        font-size: 0.9em;
        color: black;
        font-weight: 500;
        background-color: white;
        border-radius: 2px;
        :outline{
            border: none;
        }
        :active{
            border: none;
        }
    }
`

export const CreditCardInput=styled.input`
        width: 200px;
`

export const CvvInput = styled.input`
    width: 60px;
`