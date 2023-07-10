import { AppStyle } from '@/styles/_app.style'
import connectToDatabase from '@/utils/connectDB'
import { Banner } from '@/models/banner_model'
import BannerModel from '@/models/banner_model'
import BannerSlider from '@/components/Banner'

type homePropType={
  banners: Banner[]
}

export default function Home(props:homePropType) {
  return (
    <AppStyle>
      <BannerSlider banners={props.banners}/>
    </AppStyle>
  )
}

export async function getStaticProps()
{
  await connectToDatabase()
  const banners = await BannerModel.find({ isActive: true });
  return {
    props: {
      banners: JSON.parse(JSON.stringify(banners)),
    },
  };
}