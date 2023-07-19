import styled from "styled-components";

export const FilterContainer=styled.div`
    min-width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0.5rem;
    border-radius: 1px;
    border: 0.2px solid grey;
    height: 100px;
    margin-right: 0px;
    @media screen and (max-width: 600px){
        display: none;
    }
`