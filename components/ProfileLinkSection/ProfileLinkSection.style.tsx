import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";

export const ProfileLinkContainer = styled.div`
    border-radius: 2px;
    border: 0.2px solid grey;
    background-color: white;
    display: block;   
`

export const ProfileLinkRow = styled.div.attrs((props) => ({
    className: props.className, 
  }))`
    color: black;
    display: grid;
    grid-template-columns: 1fr 1fr 6fr 1fr;
    grid-column-gap: 5px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    &.active{
        background-color: #F5FBFF;
    }

`

export const ProfileLinks= styled(Link)`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    grid-column: 3/4;
    font-family: 'Inter',sans-serif;
    font-size: 0.9em;
    font-weight: 500;
    color: grey;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    :hover{
        color: #2872F1;
    }
`

export const ProfileIcons = styled(FontAwesomeIcon)`
    grid-column: 2/3;
    color: #2872F1;
`

export const ProfileHeading = styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    grid-column: 3/4;
    font-family: 'Inter',sans-serif;
    font-size: 0.9em;
    font-weight: 500;
    color: grey;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ProfileSubLinks = styled(Link).attrs((props) => ({
    className: props.className, 
  }))`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');
    grid-column: 3/4;
    font-family: 'Inter',sans-serif;
    font-size: 0.8em;
    font-weight: 400;
    color: black;
    &.active{
        color: #2872F1;
        font-weight: 500;
    }
`