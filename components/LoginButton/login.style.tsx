import styled from "styled-components";


type dropDownSectionProp={
  justifyContent?: string
}

type styledTextProp={
  fontWeight: number
  fontColor: string
  fontFamily?: string;
  textAlign?:string

}


export const MenuContainer=styled.div`
  position: relative;
  display: inline-block;
`

export const MenuLink=styled.ul`
    list-style: none;
`

export const DropDownMenu=styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 8px);
    background-color: white;
    color: black;
    z-index: 2;
    transition: 1s ease-in;
    width: 220px;
    border: solid 1px white;
    border-radius: 2px;
    box-shadow: 1px 1px grey;

`
export const DropdownSection=styled.a`
  display: flex;
  flex-direction: row;
  justify-content: ${(props:dropDownSectionProp)=>props.justifyContent ?? 'flex-end'};
  padding: 0.5rem;
  cursor: pointer;
`
export const HorizontalDivider = styled.div`
width: 100%;
height: 0.08px;
background-color: grey;
border: none;
`;

export const StyledLinkText=styled.p`
    font-size: 0.8em;
    font-weight: ${(props:styledTextProp)=>props.fontWeight};
    font-family: ${(props) => props.fontFamily ?? "'Inter', sans-serif"};
    color: ${(props:styledTextProp)=>props.fontColor};
    flex: 5;
    text-align: ${(props:styledTextProp)=>props.textAlign ?? 'left'};
`