import styled from "styled-components";
import { AppStyle } from "./_app.style";

export const LoginContainer=styled(AppStyle)`
    display: flex;
    position: absolute;
    width: 60%;
    flex-direction: row;
    left: 50%;
    top: 35%;
    transform: translate(-50%,-35%);
    height: 60vh;
    border: 0.5px solid grey;
`

export const LoginFeature = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Noto+Sans:wght@400&display=swap');
    flex:2;
    padding: 2rem;
    background-color: #2875F1;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    h5{
        font-size: 1.25em;
        color: white;
        font-family: 'Inter',sans-serif;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    p{
        font-size: 1em;
        color: white;
        font-family: 'Noto Sans',sans-serif;
        font-weight: 400;
    }

    @media screen and (max-width: 900px)
    {
        display: none;
    }
`