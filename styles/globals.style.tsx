import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type buttonStyle={
    backgroundColor:string
    color: string
}

type iconStyle={
    width: string
    height: string
    color: string
    textAlign?: string
}

export const CustomButton = styled.button`
    background-color: ${(props:buttonStyle)=>props.backgroundColor};
    justify-content: center;
    align-items: center;
    display: flex;
    height: 28px;
    color: ${(props:buttonStyle)=>props.color};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.9em;
    border: none;
    cursor: pointer;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    min-width: 120px;
    border-radius: 1px;
`

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: ${(props:iconStyle)=>props.width};
  height: ${(props:iconStyle)=>props.height};
  color: ${(props:iconStyle)=>props.color};
  flex: 1;
  text-align: ${(props:iconStyle)=>props.textAlign??'center'};
`;