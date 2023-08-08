import styled from "styled-components";

export const OrderStatusContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;500&display=swap');
    width: 100%;
    display: flex;
    justify-content: flex-start;
    ul{
        display: flex;
        justify-content: space-between;
        list-style:none;
        position: relative;
        width: 100%;
        max-width: 400px;
    }
`

export const OrderStatusLink=styled.li`
        flex: 1;
  `

export const OrderStatusElement=styled.div.attrs((props) => ({
    className: props.className, 
  }))`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;500&display=swap');
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    position: relative;
    color: grey;
    font-size: 0.6em;
    z-index: 1;
    p{
    font-family: 'Inter',sans-serif;
    font-weight: 500;
    text-align: center;
    }
    div{
        position: absolute;
        top: 4px;
        left: -50%;
        height: 2px;
        background-color: grey;
        width: 100%;
        z-index: 2;
    }
    &.active{
        color: #24A440;
        div{
        background-color: #24A440;
        }
    }
    &.first-child{
    div{
        position: absolute;
        top: 4px;
        left: 50%;
        height: 2px;
        background-color: #24A440;
        width: 100%;
    }
    }

`

