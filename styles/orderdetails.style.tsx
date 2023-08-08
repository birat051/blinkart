import styled from "styled-components";
import { OrderView } from "./orderconfirmation.style";

export const OrderDetailsView=styled(OrderView)`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;400&family=Noto+Sans:wght@400;600&display=swap');
    grid-template-columns: 1fr 2fr 4fr 2fr;
    h2{
        span{
            font-family: 'Inter',sans-serif;
            font-size: 0.8em;
            color: #398F3C;
            font-weight: 500;
        }
    }
    @media screen and (max-width: 600px){
        grid-template-columns: 1fr 2fr 3fr;
        h2{
            display: none;
        }
    }
`

export const TotalPriceContainer=styled(OrderDetailsView)`
    border-bottom: none;
    @media screen and (max-width: 600px){
        h2{
            display: block;
        }
    }

`