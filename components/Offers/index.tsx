import { Offer } from '@/models/offer_model'
import React from 'react'
import { OfferBlock, OfferContainer, OfferList } from './Offers.style'
import { useRouter } from 'next/router'
import RouteHelper from '@/services/routerHelper'

type offerPropType={
    offerName:string,
    offerList: Offer[]
}


function Offers(props:offerPropType) {
  const router=useRouter()
  return (
    <OfferContainer>
      <h1>{props.offerName}</h1>
      <OfferList>
        {props.offerList.map((element)=>{
            return (
                <OfferBlock key={element._id} onClick={()=>router.push(RouteHelper.getOfferRoute(element._id))}>
                    <img src={element.categoryImageUrl} alt={`Offer Image for ${element.title}`}/>
                    <h1>{element.title}</h1>
                    {element.price> 0 && <h2>From {element.price}</h2>}
                    {element.price===0 && element.discount>0 && <h2>Min. {element.discount}% off</h2>}
                    <h3>{element.description}</h3>
                </OfferBlock>
            )
        })}
      </OfferList>
    </OfferContainer>
  )
}

export default Offers
