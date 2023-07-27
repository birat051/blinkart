import styled from "styled-components";

export const ManageAddressContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');
    background-color: white;
    border: 0.2px solid grey;
    border-radius: 2px;
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600; 
        color: black;
        margin-bottom: 1rem;
    }
    @media screen and (min-width: 600px){
        flex: 6;
    }
`

export const AddAddress = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    padding: 1rem;
    color: #347BF0;
    display: flex;
    border: 0.2px solid grey;
    justify-content: flex-start;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
    h2{
        padding-left: 8px;
        font-family: 'Inter',sans-serif;
        font-size: 0.9em;
        font-weight: 500;
    }
`