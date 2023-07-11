import { AppStyle } from '@/styles/_app.style'
import connectToDatabase from '@/utils/connectDB'
import { Banner } from '@/models/banner_model'
import BannerModel from '@/models/banner_model'
import BannerSlider from '@/components/Banner'
import CategoryDisplay from '@/components/Category'
import { ProductCategory } from '@/models/product_category_model'
import ProductCategoryModel from '@/models/product_category_model'

type homePropType={
  banners: Banner[],
  category: ProductCategory[]
}

export default function Home(props:homePropType) {
  return (
    <AppStyle>
      <CategoryDisplay category={props.category}/>
      <BannerSlider banners={props.banners}/>
    </AppStyle>
  )
}

export async function getStaticProps()
{
  try{
  await connectToDatabase()
  const banners = await BannerModel.find({ isActive: true });
  const category = await ProductCategoryModel.find({parentCategory: null})
  console.log('Category is: ',category)
  return {
    props: {
      banners: JSON.parse(JSON.stringify(banners)),
      category: JSON.parse(JSON.stringify(category))
    },
  };
  }
  catch(error)
  {
    console.log('Caught an error while searching for data in DB: ',error)
  }
  return{
   props:{
    banners: [],
    category: []
   }   
  }
}