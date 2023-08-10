import ProductView from '@/components/ProductView';
import OfferModel, { Offer } from '@/models/offer_model';
import ProductDataModel, { Product } from '@/models/product_data_model';
import { AppStyle } from '@/styles/_app.style';
import { CategoryPageContainer, ProductColumn, ProductListView } from '@/styles/categorypage.style';
import connectToDatabase from '@/utils/connectDB';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts';


type offerPagePropType={
    matchingProducts:Product[]
    error?: string
    offer: Offer
}

function OfferPage(props:offerPagePropType) {
  const router=useRouter()
  if(router.isFallback)
  return (
      <AppStyle>
          <LoadingOverlayWrapper active={true}>
          </LoadingOverlayWrapper>
      </AppStyle>
  )
  if(props.error)
  {
    return(
    <AppStyle>
        <p>No offer found</p>
    </AppStyle>
    )
  }
  return (
    <CategoryPageContainer>
        <Head>
            <title>Offers on {props.offer.title}</title>
        </Head>
        <ProductColumn>
        {props.matchingProducts.length > 0 && (
          <ProductListView>
            {props.matchingProducts.map((product) => {
              return <ProductView product={product} key={product._id} />;
            })}
          </ProductListView>
        )}
        </ProductColumn>
    </CategoryPageContainer>
  )
}


export async function getStaticPaths()
{
    await connectToDatabase();
    const offers = await OfferModel.find();
    const paths = [];
    for (const offer of offers) {
        paths.push({
          params: {
            iD: offer._id.toString(),
          },
        });
    }
    return {
      paths,
      fallback: true, 
    };
}

export async function getStaticProps(context:GetStaticPropsContext)
{
    const {params} = context
    await connectToDatabase();
    const offer = await OfferModel.findOne({_id: params?.iD})
    // console.log('Category id from offer is: ',offer.category.toString())
    if(offer && (offer.discount!=null || offer.price!=null))
    {
        let matchingProducts=[]
        if(offer.discount!=null && offer.discount>0)
        {
            // console.log('Discount is: ',offer.discount)
            matchingProducts = await ProductDataModel.find({
                category: offer.category.toString(),
                discount: { $gte: offer.discount},
            });
            // console.log('Got products: ',matchingProducts)
        }
        else{
            // console.log('Price is: ',offer.price)
            matchingProducts = await ProductDataModel.find({
                category: offer.category.toString(),
                price: { $gte: offer.price},
            });
            // console.log('Got products with price: ',matchingProducts)
        }
        matchingProducts.sort((a, b) => a.price - b.price);
        return {
            props: {
                matchingProducts: JSON.parse(JSON.stringify(matchingProducts)),
                offer:JSON.parse(JSON.stringify(offer))
            }
        }
    }
    else{
        return {
            props: {
                error: 'No valid offer found'
            }
        }
    }
}

export default OfferPage