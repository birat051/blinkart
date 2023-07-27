import ManageAddresses from '@/components/ManageAddresses'
import ProfileLinkSection from '@/components/ProfileLinkSection'
import ProfileNameDisplay from '@/components/ProfileNameDisplay'
import AddressModel, { Address } from '@/models/address_model'
import UserDataModel, { UserModel } from '@/models/user_model'
import { ProfilePage, ProfilePageLeftColumn, ProfilePageRightColumn, ProfileSpacer } from '@/styles/profile.style'
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
    user: UserModel
}

function Profile(props:profilePropType) {
  const [isLoading, setisLoading] = useState(false)
  const changeLoading=(value:boolean)=>{
    setisLoading(value)
  }
  const router=useRouter()
  const {params=[]}=router.query
  console.log('Params are: ',params)
  return (
    <LoadingOverlayWrapper active={isLoading}>
    <ProfilePage>
        <Head>
           {params[0]==='account' && <title>My Profile</title>}
           {params[0]==='addresses' && <title>Manage Addresses</title>} 
        </Head>
        <ProfileSpacer />
      <ProfilePageLeftColumn>
        <ProfileNameDisplay username={props.user.name}/>
        <ProfileLinkSection activeLink={params}/>
      </ProfilePageLeftColumn>
      {params[0]==='addresses' && <ManageAddresses addresses={props.addresses} changeLoading={changeLoading}/>}
      {params[0]!='addresses' && <ProfilePageRightColumn>        
      </ProfilePageRightColumn>}
      <ProfileSpacer />
    </ProfilePage>
    </LoadingOverlayWrapper>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session =await getSession(context)
    await connectToDatabase()
    const userAddresses=await AddressModel.find({userId: (session?.user as CustomUser)?.id})
    const user=await UserDataModel.findOne({_id: (session?.user as CustomUser)?.id})
    // console.log('User is: ',user)
    console.log('Got addresses: ',userAddresses)
    return {
        props: {
            addresses:JSON.parse(JSON.stringify(userAddresses)),
            user:JSON.parse(JSON.stringify(user))
        }
    }
}

export default Profile
