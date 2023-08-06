import styled from "styled-components";

export const ProfileForm= styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Noto+Sans:wght@400;600&display=swap');
    flex: 6;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 0.2px solid grey;
    border-radius: 2px;
    padding: 1rem;
    label{
        font-family: 'Inter',sans-serif;
        font-weight: 500;
        font-size: 1em;
        color: black;
        margin-bottom: 1rem;
        span{
            margin-left: 0.9rem;
            font-family: 'Inter',sans-serif;
            font-weight: 600;
            color: #2872F1;
            font-size: 0.7em;
            cursor: pointer;
        }
    }
    div{
        display: flex;
        justify-content: space-between;
        max-width: 300px;
        margin-bottom: 1rem;
        input{
            width: 140px;
            padding: 0.5rem;
            border: 0.2px solid grey;
            color: black;
            font-family: 'Noto Sans',sans-serif;
            font-size: 0.75em;
            font-weight: 400;
            background-color: white;
            border-radius: 2px;
        }
        input:disabled{
            color: #868786;
            background-color: #FBFBFA;
        }
    }
    button{
        background-color: #2872F1;
        width: 140px;
        font-family: 'Inter',sans-serif;
        color: white;
        font-weight: 500;
        font-size: 0.9em;
        border-radius: 2px;
        border: none;
        padding: 0.5rem;
        margin-bottom: 1rem;
        cursor: pointer;
    }
    p
    {
        color: red;
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.75em;
        font-weight: 400;
        margin-bottom: 1rem;
    }
`

