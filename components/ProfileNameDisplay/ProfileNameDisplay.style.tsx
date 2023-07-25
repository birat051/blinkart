import styled from "styled-components";

export const ProfileNameContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600;300&display=swap');
    /* display: flex; */
    display: grid;
    grid-template-columns: 1fr 1fr 6fr 1fr;
    grid-column-gap: 5px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: white;
    border: 0.2px solid grey;
    border-radius: 2px;
    color: black;
    margin-bottom: 1rem;
    img{
        display: flex;
        object-fit: contain;
        width: 30px;
        height: 30px;
        grid-column: 2/3;
    }
    div{
        grid-column: 3/4;
        display: flex;
        flex-direction: column;
        p{
            font-weight: 300;
            font-size: 0.6em;
            font-family: 'Inter',sans-serif;
            margin-bottom: 0.5rem;
            color: black;
        }
        h1{
            font-weight: 600;
            font-size: 0.75em;
            font-family: 'Inter',sans-serif;
            color: black;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`

