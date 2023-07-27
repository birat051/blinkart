import styled from "styled-components";

export const ProfilePage=styled.div`
    min-height: 80vh;
    background-color: #F1F3F7;
    padding: 1rem;
    /* padding-left: 3rem;
    padding-right: 3rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    @media screen and (max-width: 600px){
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
`

export const ProfilePageLeftColumn=styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    margin-right: 0.5rem;
    @media screen and (max-width: 600px){
        margin-bottom: 1rem;
        margin-right: 0px;
    }
`

export const ProfilePageRightColumn = styled.div`
    flex: 6;
    background-color: white;
    border: 0.2px solid grey;
    border-radius: 2px;
    height: 20px;
`

export const ProfileSpacer=styled.div`
    flex: 1;
    @media screen and (max-width: 600px){
        display: none;
    }
`

