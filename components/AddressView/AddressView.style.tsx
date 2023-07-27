import styled from "styled-components";

export const AddressViewContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;400;600&display=swap');
    border-radius: 2px;
    border: 0.2px solid grey;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 0.5rem;
    p{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.8em;
        font-weight: 400;
        color : black;
        span{
            font-weight: 600;
        }
    }
    h1{
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.9em;
        font-weight: 500;
        color : black;
        margin-bottom: 1rem;
    }
`

export const AddressTypeView = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    position: relative;
    p{
        padding: 4px;
        background-color: #F0F0F0;
        color: #878787;
        font-family: 'Inter',sans-serif;
        font-size: 0.6em;
        border-radius: 2px;
    }
`

export const AddressPopupOptions = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
    z-index: 2;
    display: flex;
    border-radius: 2px;
    border: 0.2px solid grey;
    flex-direction: column;
    padding: 0.5rem;
    padding-bottom: 0.25rem;
    position: absolute;
    right: -2%;
    background-color: white;
    /* transform: translateX(50%); */
    top: 0%;
    /* width: 80px; */
    /* height: 50px; */
    h2{
        font-family: 'Inter',sans-serif;
        font-weight: 400;
        cursor: pointer;
        font-size: 0.75em;
        color: black;
        margin-bottom: 0.75rem;
        :hover{
            color: #2872F1;
            font-weight: 500;
        }
    }
`