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

interface CustomUser extends User {
    id: string;
}

type profilePropType={
    addresses:Address,
    user: UserModel
}

function Profile(props:profilePropType) {
  const router=useRouter()
  const {params=[]}=router.query
  console.log('Params are: ',params)
  return (
    <ProfilePage>
        <Head>
           {params[0]==='account' && <title>My Profile</title>} 
        </Head>
        <ProfileSpacer />
      <ProfilePageLeftColumn>
        <ProfileNameDisplay username={props.user.name}/>
        <ProfileLinkSection activeLink={params}/>
      </ProfilePageLeftColumn>
      <ProfilePageRightColumn>

      </ProfilePageRightColumn>
      <ProfileSpacer />
    </ProfilePage>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session =await getSession(context)
    await connectToDatabase()
    const userAddresses=await AddressModel.find({userId: (session?.user as CustomUser)?.id})
    const user=await UserDataModel.findOne({_id: (session?.user as CustomUser)?.id})
    // console.log('User is: ',user)
    return {
        props: {
            addresses:JSON.parse(JSON.stringify(userAddresses)),
            user:JSON.parse(JSON.stringify(user))
        }
    }
}

export default Profile
