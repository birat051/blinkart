import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

type buttonStyle={
    backgroundColor:string
    color: string
    height?: string
}

type iconStyle={
    width: string
    height: string
    color: string
    display?: string
}

type gridIconStyle={
    gridColumnStart?: number,
    gridColumnEnd?: number,
    gridRowStart?: number,
    gridRowEnd?: number
}

export const CustomButton = styled.button`
    background-color: ${(props:buttonStyle)=>props.backgroundColor};
    justify-content: center;
    align-items: center;
    display: flex;
    height: ${(props:buttonStyle)=>props.height??'28px'};
    color: ${(props:buttonStyle)=>props.color};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.9em;
    border: none;
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    min-width: 120px;
    border-radius: 1px;

    @media screen and (max-width: 800px){
        min-width:40px;
        padding: 10px;
    }
`

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: ${(props:iconStyle)=>props.width};
  height: ${(props:iconStyle)=>props.height};
  color: ${(props:iconStyle)=>props.color};
  flex: 1;
  display: ${(props:iconStyle)=>props.display??'block'};

  @media screen and (max-width:800px){
   display : block;
  }
`;

export const GridIcon = styled(StyledFontAwesomeIcon)`
  grid-column-start: ${(props:gridIconStyle)=>props.gridColumnStart};
  grid-column-end: ${(props:gridIconStyle)=>props.gridColumnEnd};
  grid-row-end: ${(props:gridIconStyle)=>props.gridRowEnd};
  grid-row-start: ${(props:gridIconStyle)=>props.gridRowStart};
`;

export const GridImage = styled(Image)`
    grid-column-start: ${(props:gridIconStyle)=>props.gridColumnStart??1};
  grid-column-end: ${(props:gridIconStyle)=>props.gridColumnEnd??1};
  grid-row-end: ${(props:gridIconStyle)=>props.gridRowEnd??1};
  grid-row-start: ${(props:gridIconStyle)=>props.gridRowStart??1};
`

