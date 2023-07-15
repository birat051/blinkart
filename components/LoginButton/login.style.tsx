import styled from "styled-components";


type dropDownSectionProp={
  justifyContent?: string
}

type styledTextProp={
  fontWeight: number
  fontColor: string
  fontFamily?: string;
  textAlign?:string
  gridcolumnstart:number,
  gridcolumnend: number
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
    top: calc(100% + 1px);
    // top: 100%;
    background-color: white;
    color: black;
    z-index: 4;
    transition: 1s ease-in;
    width: 220px;
    border: solid 1px white;
    border-radius: 2px;
    box-shadow: 1px 1px grey;

    @media screen and (max-width: 800px) {
      display: none;
  }
`
export const DropdownSection=styled.a`
  display: grid;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  grid-template-columns: 1fr 1fr 10fr 1fr;
`

export const DesktopDropDownHeader=styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 3fr 1fr;
  align-items: center;
  height: 30px;
  cursor: pointer;
`


export const HorizontalDivider = styled.div`
width: 100%;
height: 1px;
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
    grid-column-start: ${(props:styledTextProp)=>props.gridcolumnstart};
    grid-column-end: ${(props:styledTextProp)=>props.gridcolumnend};
    padding-left: 5px;
`