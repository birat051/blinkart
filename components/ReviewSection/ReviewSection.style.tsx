import Link from "next/link";
import styled from "styled-components";

export const ReviewSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    border: 0.2px solid grey;
    border-bottom: none;
    border-radius: 2px;
`

export const RatingsView = styled.div`
     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    padding: 1rem;
    /* padding-top: 0.5em;
    padding-bottom: 0.5em; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom: 0.2px solid grey;
    span{
        padding-left: 4px;
    }
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1.25em;
        font-weight: 600;
        color: black;
        margin-bottom: 0.5rem;
    }
    p{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        color: black;
    }
`

export const ReviewView = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;400&display=swap');
    padding: 1rem;
    border-bottom: 0.2px solid grey;
    div{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: baseline;
        h2{
            font-family: 'Noto Sans',sans-serif;
            font-size: 0.75em;
            font-weight: 500;
            color: black;
        }
        h3{
            font-family: 'Noto Sans',sans-serif;
            font-size: 0.5em;
            font-weight: 500;
            color: grey;
            padding-right : 4px;
        }
        h4{
            font-family: 'Noto Sans',sans-serif;
            font-size: 0.4em;
            font-weight: 400;
            color: grey;
        }
        margin-bottom: 0.5rem;
    }
    p{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.75em;
        font-weight: 400;
        color: black;
        margin-bottom: 0.5rem;
    }

`

export const RatingContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500&display=swap');
    background-color: #398F3C;
    color: white;
    font-family: 'Noto Sans',sans-serif;
    font-size: 0.8em;
    font-weight: 500;
    padding: 4px;
    margin-right: 4px;
    border-radius: 4px;
    display: flex;
    align-items: baseline;
`

export const AllReviewLink = styled(Link)`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@600&display=swap');
    color: rgb(41,116,241);
    font-family: 'Noto Sans',sans-serif;
    font-size: 1em;
    font-weight: 600;
    padding: 1rem;
    border-bottom: 0.2px solid grey;
`