import { AppStyle } from '@/styles/_app.style'
import connectToDatabase from '@/utils/connectDB'
import { Banner } from '@/models/banner_model'
import BannerModel from '@/models/banner_model'
import BannerSlider from '@/components/Banner'
import CategoryDisplay from '@/components/Category'
import { ProductCategory } from '@/models/product_category_model'
import ProductCategoryModel from '@/models/product_category_model'
import OfferModel from '@/models/offer_model'
import { Offer } from '@/models/offer_model'
import Offers from '@/components/Offers'

type homePropType={
  banners: Banner[],
  category: ProductCategory[],
  subcategories: Object,
  topOffers: Offer[]
}

export default function Home(props:homePropType) {
  // console.log('Subcategories is: ',props.subcategories)
  return (
    <AppStyle>
      <CategoryDisplay category={props.category} subcategories={props.subcategories}/>
      <BannerSlider banners={props.banners}/>
      <Offers offerName='Top Offers' offerList={props.topOffers}/>
    </AppStyle>
  )
}

export async function getStaticProps()
{
  try{
  await connectToDatabase()
  const banners = await BannerModel.find({ isActive: true });
  const category = await ProductCategoryModel.find({parentCategory: null})
  const topoffers = await OfferModel.find({ isTopOffer: true }).populate('category');
  // Get list of all subcategories for each category
  const categoriesWithSubcategories = await Promise.all(
    JSON.parse(JSON.stringify(category)).map(async (data:ProductCategory) => {
      const subcategories = await ProductCategoryModel.find({
        parentCategory: data._id,
      });
      return {
        ...data,
        subcategories: subcategories.map((subcategory) =>
        JSON.parse(JSON.stringify(subcategory))
          // subcategory.toObject()
        ),
      };
    })
  );

  // Create a hashmap of subcategories with parent category id as the key
  const subcategoryMap = categoriesWithSubcategories.reduce((map, category) => {
    map[category.name] = category.subcategories;
    return map;
  }, {});
  // console.log('Subcategory is: ',subcategoryMap)
  // console.log('Category is: ',category)
  return {
    props: {
      banners: JSON.parse(JSON.stringify(banners)),
      category: JSON.parse(JSON.stringify(category)),
      subcategories: subcategoryMap,
      topOffers: JSON.parse(JSON.stringify(topoffers))
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
    category: [],
    subcategories: {},
    topOffers: []
   }   
  }
}