import React from 'react'
import connectToDatabase from '@/utils/connectDB'
import ProductCategoryModel from '@/models/product_category_model'
import { GetStaticPropsContext } from 'next';
import ProductDataModel from '@/models/product_data_model';
import { Product } from '@/models/product_data_model';
import { AppStyle } from '@/styles/_app.style';
import { CategoryPageContainer, ProductListView } from '@/styles/categorypage.style';
import ProductFilter from '@/components/ProductFilter';
import ProductView from '@/components/ProductView';


type productType={
  products: Product[]
}

function CategoryPage(props:productType) {
  return (
    <CategoryPageContainer>
      <ProductFilter />
      <ProductListView>
      {props.products.map((product)=>{
       return <ProductView product={product} key={product._id}/>
      })}
      </ProductListView>
    </CategoryPageContainer>
  )
}


export async function getStaticPaths()
{
    await connectToDatabase()
    const categories = await ProductCategoryModel.find()
    const paths = categories.map((category) => ({
        params: { iD: category._id.toString() },
      }));
    return {
        paths,
        fallback: false, // or true if you want to enable fallback rendering
    };
}

export async function getStaticProps(context:GetStaticPropsContext) {
  const {params}=context
  await connectToDatabase()
  const products=await ProductDataModel.find({category: params?.iD})
  console.log('Products are: ',products)
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default CategoryPage
