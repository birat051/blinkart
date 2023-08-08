import styled from "styled-components";

type bannerType=
{
    backgroundimage: string
}

export const BannerContainer=styled.div`
    position: relative;
    /* width: 100%; */
    height: 300px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    justify-content: stretch;
    border: 0.5px solid grey;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    cursor: pointer;
    ::-webkit-scrollbar{
        display: none;
    }
    @media screen and (max-width: 600px){
        height: 150px;
    }
`

export const BannerImage=styled.div.attrs((props) => ({
    className: props.className, 
  }))`
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    display: none;
    &.active{
    display: flex;
    background-image: url(${(props:bannerType)=>props.backgroundimage});
    transition: 0.5s ease-in-out;
    }
`


export const BannerNav = styled.div.attrs((props) => ({
    className: props.className, 
  }))`
       position: absolute;
      top: 50%;
      display: flex;
       align-items: center;
       justify-content: center;
       height: 60px;
       width: 30px;
       transform: translateY(-50%);
       background-color: white;
       z-index: 2;
       cursor: pointer;
       border: 0.5px solid grey;
       &.left{
           left:0%;
           color: grey;
           border-top-right-radius: 8px;
           border-bottom-right-radius: 8px;
       }
  
       &.right{
           right: 0%;
           color: grey;
           border-top-left-radius: 8px;
           border-bottom-left-radius: 8px;
       }
   `
