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
  topOffers: Offer[],
  offerByCategory: Object
}


export default function Home(props:homePropType) {
  // console.log('Subcategories is: ',props.subcategories)
  // console.log('Offers are: ',props.offerByCategory)
  return (
    <AppStyle>
      <CategoryDisplay category={props.category} subcategories={props.subcategories}/>
      <BannerSlider banners={props.banners}/>
      <Offers offerName='Top Offers' offerList={props.topOffers}/>
      {Object.entries(props.offerByCategory).filter(([category, offers]) => offers.length > 0).map(([category, offers]) => (
          <Offers key ={category}offerName={`Offers in ${category}`} offerList={offers} />
      ))}
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
  const offersByCategory = await Promise.all(
    JSON.parse(JSON.stringify(category)).map(async (data:ProductCategory) => {
      const categoryOffers = await OfferModel.find({
        $or: [
          { category: data._id },
          { parentCategory: data._id }
        ],
        isTopOffer: false
      });
      // console.log('Category offers is: ',categoryOffers)
      return {
        ...data,
        offers: categoryOffers.map((categoryOffer) =>
        JSON.parse(JSON.stringify(categoryOffer))
          // subcategory.toObject()
        ),
      };
    })
  );
  const offerMap = offersByCategory.reduce((map, category) => {
    map[category.name] = category.offers;
    return map;
  }, {});
  // console.log("Offers by category is: ",offerMap)
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
      topOffers: JSON.parse(JSON.stringify(topoffers)),
      offerByCategory: offerMap
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
    topOffers: [],
    offerByCategory: {}
   }   
  }
}