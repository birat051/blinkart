import ManageAddresses from '@/components/ManageAddresses'
import OrderPageList from '@/components/OrderPageList'
import ProfileLinkSection from '@/components/ProfileLinkSection'
import ProfileNameDisplay from '@/components/ProfileNameDisplay'
import ProfilePageForm from '@/components/ProfilePageForm'
import AddressModel, { Address } from '@/models/address_model'
import OrderModel from '@/models/order_model'
import UserDataModel, { UserModel } from '@/models/user_model'
import OrderServices, { OrderDetailsResponse } from '@/services/orderServices'
import { ProfilePage, ProfilePageLeftColumn, ProfileSpacer } from '@/styles/profile.style'
import connectToDatabase from '@/utils/connectDB'
import { GetServerSidePropsContext } from 'next'
import { User } from 'next-auth'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts'

interface CustomUser extends User {
    id: string;
}

type profilePropType={
    addresses:Address[],
    user: UserModel,
    orders: OrderDetailsResponse[],
    error?: string,
    totalOrders: number,
    totalPages: number
}

function Profile(props:profilePropType) {
  const [isLoading, setisLoading] = useState(false)
  const name=props.user.name.split(' ')
  const changeLoading=(value:boolean)=>{
    setisLoading(value)
  }
  const router=useRouter()
  const {params=[]}=router.query
  const changeIsLoading=(value:boolean)=>{
    setisLoading(value)
  }
  // console.log('Params are: ',params)
  if(props.error)
  return (
    <ProfilePage>
      <h1>{props.error??''}</h1>
    </ProfilePage>
  )
  return (
    <LoadingOverlayWrapper active={isLoading}>
    <ProfilePage>
        <Head>
           {params[0]==='info' && <title>My Profile</title>}
           {params[0]==='addresses' && <title>Manage Addresses</title>} 
           {params[0]==='orders' && <title>Your Order History</title>}
        </Head>
        <ProfileSpacer />
      <ProfilePageLeftColumn>
        <ProfileNameDisplay username={props.user.name}/>
        <ProfileLinkSection activeLink={params}/>
      </ProfilePageLeftColumn>
      {params[0]==='addresses' && <ManageAddresses addresses={props.addresses} changeLoading={changeLoading}/>}
      {params[0]==='info' && <ProfilePageForm firstName={name[0]} lastName={name.length>0?name[name.length-1]:''} mobileNumber={props.user.mobileNumber??''} emailAddress={props.user.email}/>}
      {params[0]==='orders' && <OrderPageList orderList={props.orders} totalPages={props.totalPages} changeIsLoading={changeIsLoading}/>}
      <ProfileSpacer />
    </ProfilePage>
    </LoadingOverlayWrapper>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session =await getSession(context)
    try{
    await connectToDatabase()
    const userAddresses=await AddressModel.find({userId: (session?.user as CustomUser)?.id})
    const user=await UserDataModel.findOne({_id: (session?.user as CustomUser)?.id})
    const orders=await OrderServices.getAllOrders(1,3,(session?.user as CustomUser)?.id)
    const totalOrders=await OrderModel.countDocuments({userId: (session?.user as CustomUser)?.id})
    const totalPages = Math.ceil(totalOrders / 3);
    // console.log('User is: ',user)
    // console.log('Got addresses: ',userAddresses)
    console.log('Total orders are: ',totalOrders)
    console.log('Total Pages are: ',totalPages)
    return {
        props: {
            addresses:JSON.parse(JSON.stringify(userAddresses)),
            user:JSON.parse(JSON.stringify(user)),
            orders: orders,
            totalOrders,
            totalPages
        }
    }
  }
  catch(error)
  {
    return {
      props: {
        error: 'An error occurred while fetching user data and orders: '+error,
      },
    };
  }
}

export default Profile
