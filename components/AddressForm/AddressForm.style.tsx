import styled from "styled-components";

export const AddressFormContainer = styled.form`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Noto+Sans:wght@400;600&display=swap');
    background-color: #F5FBFF;
    border: 0.2px solid grey;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    h2{
        font-family: 'Inter',sans-serif;
        font-size: 0.8em;
        font-weight: 500;
        color: #2872F1;
        margin-bottom: 0.5rem;
    }
    textarea{
        background-color: white;
        color: grey;
        font-family: 'Noto Sans';
        font-weight: 400;
        font-size: 0.75em;
        padding: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border: 0.2px solid grey;
        border-radius: 2px;
        margin-bottom: 1rem;
        max-width: 508px;
        /* max-width: 400px; */
    }
    label{
        font-family: 'Inter',sans-serif;
        font-weight: 500;
        font-size: 0.65em;
        color: grey;
        margin-bottom: 0.5rem;
    }
    p{
        font-family: 'Inter',sans-serif;
        font-size: 0.75em;
        font-weight: 400;
        color: red;
        margin-bottom: 1rem;
    }
`
export const AddressInputRow=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 508px;
    div{
        display: flex;
        flex-direction: column;
        max-width: 250px;
        flex: 1;
    input
    {
        background-color: white;
        color: grey;
        font-family: 'Noto Sans';
        font-weight: 400;
        font-size: 0.75em;
        padding: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border: 0.2px solid grey;
        border-radius: 2px;
        margin-bottom: 1rem;
        /* margin-right: 1rem; */
    }
    p{
        font-family: 'Inter',sans-serif;
        font-size: 0.75em;
        font-weight: 400;
        color: red;
        margin-bottom: 1rem;
    }
    }
    @media screen and (max-width: 850px){
        div{
            max-width: 210px;
        }
    }
    @media screen and (max-width: 600px){
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        max-width: none;
        margin-bottom: 0rem;
        input{
            max-width: none;
            margin-bottom: 1rem;

        }
    }
`
export const AddressFormButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    @media screen and (max-width: 600px){
        flex-direction: column;
        justify-content: flex-start;
    }
`

export const AddressSaveButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    color: white;
    background-color: #2872F1;
    font-weight: 500;
    font-family: 'Inter',sans-serif;
    font-size: 1em;
    min-width: 200px;
    padding: 0.5rem;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    @media screen and (max-width: 600px){
        min-width: none;
        width: 100%;
        margin-bottom: 1rem;
    }

`

export const AddressCancelButton = styled.button`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    color: #2872F1;
    background-color: #F5FBFF;
    font-weight: 500;
    font-family: 'Inter',sans-serif;
    font-size: 1em;
    min-width: 200px;
    margin-right: 1rem;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    @media screen and (max-width: 600px){
        min-width: none;
        width: 100%;
    }
`

export const AddressTypeContainer=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Noto+Sans:wght@500&display=swap');
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    label{
        font-family: 'Noto Sans',sans-serif;
        font-weight: 500;
        color: black;
        font-size: 0.8em;
        margin-right: 1rem;
    }
`

export const StyledRadioInput = styled.input`
/* Add your custom radio input styles here */
/* For example, you can change the color of the radio button */
    border: 0.2px solid grey;
    :checked{
    accent-color: #2872F1;
    }
    margin-right: 0.25rem;
`;

export const StateDropdownContainer = styled.select`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600&display=swap');
    padding: 0.5rem;
    flex: 1;
    background-color: white;
    border-radius: 2px;
    border: 0.2px solid grey;
    color: grey;
    /* margin-left: 1rem; */
    margin-bottom: 1rem;
    option{
        flex: 1;
        font-family: 'Noto Sans';
        font-weight: 400;
        font-size: 0.75em;
        color: grey;
    }
    font-family: 'Noto Sans';
    font-weight: 400;
    font-size: 0.65em;
    &:focus {
    /* Add the desired border style for the focused state */
    border: 1px solid #2872F1; /* Change 'blue' to the color you want */
    outline: none; /* Optionally, remove the default outline */
  }
  @media screen and (max-width: 600px){
    margin-left: 0rem;
    margin-bottom : 1rem;
  }
`