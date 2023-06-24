import styled from "styled-components";

export const CustomFooter = styled.div`
    /* height: 20vh; */
    background-color: #0a3c68;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* justify-content: center; */
    /* padding-right: 4rem; */
    padding-bottom: 2rem;
`

export const AddressSection = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Noto+Sans:wght@300&display=swap');
    width: 50%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    h5{
        font-family: 'Inter',sans-serif;
        font-size: 0.75em;
        color: white;
        margin-bottom: 10px;
        font-weight: 300;
    }
    p
    {
        font-family: 'Noto Sans',sans-serif;
        font-size: 0.75em;
        color: white;
        font-weight: 300;
    }
    /* text-align: center; */
`

export const FooterCopyright=styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
    h5{
        font-family: 'Inter',sans-serif;
        font-size: 0.75em;
        color: white;
        margin-top: 10px;
        font-weight: 400;
    }
    width: 50%;
`