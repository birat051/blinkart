import styled from "styled-components";

export const CartAddressBackground = styled.div`
    z-index: 2;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(49,49,49,0.8);
`

export const CartModalContainer = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Noto+Sans:wght@400;600&display=swap');
    background-color: white;
    border-radius: 2px;
    border: 0.2px solid grey;
    max-width: 300px;
    max-height: 300px;
    overflow-y: scroll;
    overflow-x: visible;
    transform:translate(-50%,-50%);
    ::-webkit-scrollbar{
        display: none;
    }
    position: fixed;
    z-index: 3;
    left: 50%;
    top: 50%;
    padding: 1rem;
    h1{
        font-family: 'Inter',sans-serif;
        font-size: 1em;
        font-weight: 600;
        color: black;
        margin-bottom: 1rem;
    }
`

export const CartAddressRow = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Noto+Sans:wght@400;500;300&display=swap');
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
    div{
        overflow: hidden;
        flex: 3;
        p{
            font-family: 'Noto Sans',sans-serif;
            font-weight: 500;
            font-size: 0.9em;
            color: black;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            span{
                font-weight: 300;
                color: grey;
                padding: 2px;
                font-size: 0.6em;
                background-color: #F1F3F4;
                margin-left: 0.5rem;
                border-radius: 2px;
            }
        }
        h1{
            font-family: 'Noto Sans',sans-serif;
            font-weight: 400;
            font-size: 0.95em;
            color: grey;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 0.25rem;
        }
    }
`