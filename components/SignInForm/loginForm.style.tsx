import Link from "next/link";
import styled from "styled-components";

export const LoginForm = styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Noto+Sans:wght@400&display=swap');
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 2rem;
    justify-content: space-between;
    label{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        color: grey;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

   
    input
    {
        background-color: white;
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-weight: 400;
        border: none;
        border-bottom: 0.5px solid grey;
        margin-bottom: 1rem;
        padding-bottom: 5px;
    }

    input:focus {
        outline: none;
        border-bottom-color: #2973EE;
    }

    div
    {
        display: flex;
        flex-direction: column;
    }

`

export const FormSpacer=styled.div`
    height: 0px;
    margin-bottom: 2rem;
`

export const SignupLink = styled(Link)`
     @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap');
     font-family: 'Noto Sans',sans-serif;
     font-size: 1em;
     text-align: center;
     color: #2973EE;
     font-weight: 700;
`