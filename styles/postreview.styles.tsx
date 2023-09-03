import styled from "styled-components";

export const RatingsContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;500&display=swap');
    padding: 1rem;
    background-color: white;
    border-radius: 2px;
    border: 0.1px solid grey;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        color: black;
    }
`

export const RatingsDisplay=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;500&display=swap');
    display: flex;
    h2{
        font-family: 'Inter',sans-serif;
        font-size: 0.9em;
        font-weight: 500;
        color: black;
    }
    div{
        display: flex;
        flex-direction: column;
        margin-right: 0.5rem;
        justify-content: space-evenly;
    }
    p{
        font-family: 'Inter',sans-serif;
        font-size: 0.75em;
        font-weight: 500;
        color: grey;
    }
    span{
        padding: 5px;
        border-radius: 2px;
        background-color: #398E3D;
        color: white;
        font-weight: 600;
        font-size: 0.75em;
        color: white;
        font-family: 'Inter',sans-serif;
    }
`

export const PostReviewContainer=styled.div`
    width: 100%;
    min-height: 80vh;
    background-color: #F0F3F6;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`

export const PostReviewForm=styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;400&family=Noto+Sans:wght@400;600&display=swap');
    border: 0.1px solid grey;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    /* padding: 1rem; */
    background-color: white;
    border-radius: 2px;
    padding-top: 1rem;
    p{
        font-family: 'Noto Sans',sans-serif;
        color: red;
        font-weight: 400;
        font-size: 0.75em;
        margin-left: 1rem;
        margin-bottom: 1rem;
    }
    label{
        color: black;
        font-family: 'Noto Sans',sans-serif;
        font-weight: 600;
        font-size: 0.8em;
        margin-bottom: 1rem;
        padding-left: 1rem;
    }
    input
    {
        font-family: 'Noto Sans',sans-serif;
        font-weight: 400;
        background-color: white;
        border: 0.1px solid grey;
        padding: 0.5rem;
        color: black;
        font-size: 0.75em;
        margin-bottom: 1rem;
        min-width: 300px;
        margin-left: 1rem;
        border-radius: 2px;
    }
    textarea{
        font-family: 'Noto Sans',sans-serif;
        font-weight: 400;
        background-color: white;
        border: 0.1px solid grey;
        padding: 0.5rem;
        color: black;
        font-size: 0.75em;
        min-width: 300px;
        margin-left: 1rem;
        margin-bottom: 1rem;
        border-radius: 2px;
    }
    h2{
        color: black;
        font-size: 1em;
        font-family: 'Noto Sans',sans-serif;
        font-weight: 600;
        margin-top: 1rem;
        margin-left:1rem;
        margin-bottom: 1rem;
    }
    button
    {
        min-width: 300px;
        margin-left: 1rem;
        margin-bottom: 1rem;
        font-family: 'Inter',sans-serif;
        font-weight: 500;
        font-size: 0.8em;
        color: white;
        padding: 0.75rem;
        border-radius: 2px;
        background-color: #FA651B;
        border: none;
        cursor: pointer;
    }
`

export const StarRatingContainer=styled.div`
    display: flex;
    /* width: 100%; */
    justify-content: space-between;
    width: 200px;
    align-items: center;
    border-bottom: none;
    padding: 1rem;
`

export const ReviewFormDivider=styled.div`
    height: 0.5px;
    width: 100%;
    background-color: grey;
`