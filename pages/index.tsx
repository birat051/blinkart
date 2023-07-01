import { AppStyle } from '@/styles/_app.style'
import connectToDatabase from '@/utils/connectDB'
import Banner from '@/models/banner_model'

type homePropType={
  banners: typeof Banner[]
}

export default function Home(props:homePropType) {
  return (
    <AppStyle>
      <h1>Home</h1>
    </AppStyle>
  )
}

export async function getStaticProps()
{
  await connectToDatabase()
  const banners = await Banner.find()
  return {
    props: {
      banners: JSON.parse(JSON.stringify(banners)),
    },
  };
}