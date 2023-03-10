import React , { useEffect, useState } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { useSelector } from 'react-redux';
import { rootType } from '../redux/store';
import { getFile } from '../features/storage/utils';
import { RiMessage2Line, RiUserLine, RiUserSettingsLine } from 'react-icons/ri';
import { useGetFollowers, useGetUserProfile, useGetUserProfileByUsername } from '../features/auth/hooks';
import { SkeletonProfile } from '../features/auth';
import { useGetLikedPosts } from '../features/Profiles/Hooks';
import LikedPosts from '../features/Profiles/components/LikedPosts';
import OnlyPosts from '../features/Profiles/components/OnlyPosts';
import { EditProfileButton, FollowButton, UserPosts } from '../features/Profiles';
import { useParams } from 'react-router-dom';
import ProfileImage from '../features/Profiles/components/ProfileImage';
import LogoutButton from '../features/Profiles/components/LogoutButton';

const Profile = () => {
  const { username } = useParams()
  useSidebarChanger(username ? "" : "Profile")
  const [section , setSection] = useState<string>("Posts")
  
  const Profile : any = useSelector((state : rootType) => state?.AuthSlice?.profile);
  const USERNAME = username || Profile?.username;
  const [profile , P_pending] : any = useGetUserProfileByUsername(USERNAME || "");
  const [followers , F_pending , F_err] = useGetFollowers(profile?.uid || "")
  const pp = getFile("profiles",profile?.profile_picture || "");
  const banner_picture = getFile("profiles",profile?.banner_picture || "");


  if(
    F_pending ||
    P_pending
    )return(
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen
    border-x-[1px]
    border-color
    '
    >

      <div
      style={{
        backfaceVisibility: "hidden"
      }}
      className='
      sticky py-2 px-4
      bg-white/75 z-[10]
      backdrop-blur-sm
      top-0
      flex
      w-full
      border-b-[1px]
      border-color
      '>
        <div
        className='
        '>
          <h2
          className='
          text-[1.25rem] font-medium
          text-violet-dark/90
          '>
            Profile
          </h2>
        </div>
      </div>

      <SkeletonProfile/>

    </div>
  )

  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]    
    min-h-screen
    border-x-[1px]
    border-color
    '
    >

      <div
      style={{
        backfaceVisibility: "hidden"
      }}
      className='
      sticky py-2 px-4
      bg-white/75 z-[10]
      backdrop-blur-sm
      top-0
      flex
      w-full
      border-b-[1px]
      border-color
      '>
        <div
        className='
        '>
          <h2
          className='
          text-[1.25rem] font-medium
          text-violet-dark/90
          '>
            Profile
          </h2>
        </div>
      </div>

      <div
      className='
      flex
      flex-col
      border-b-[1px]
      border-color
      '>
        {
          banner_picture ?
          <img
          src={banner_picture}
          className='
          bg-violet-300
          w-full
          aspect-[4/1]
          z-[9]
          object-cover
          '
          />
          :
          <div
          className='
          bg-violet-300
          w-full
          aspect-[4/1]
          z-[9]
          '
          />
        }

        <div
        className='
        flex 
        items-center
        flex-wrap
        justify-between
        '>
          
          <ProfileImage
          pp={pp || ""}
          />

          <div
          className='
          mr-2
          ml-auto
          flex
          flex-wrap
          items-center
          justify-center
          gap-2
          '>
            {
              profile?.uid === Profile?.uid ?
              <>
              <LogoutButton/>
              <EditProfileButton/>
              </>
              :
              <>
              <button
              className='
              grid
              place-items-center
              w-[35px]
              h-[35px]
              text-[1.2rem]
              text-neutral-600
              rounded-full
              border-[1px]
              border-neutral-300
              hover:bg-neutral-100
              transition-all
              '>

                <RiMessage2Line/>

              </button>

              <FollowButton
              userID={profile.uid}/>
            </>
            }

          </div>
          
          
        </div>
        
        <div
        className='
        px-5
        my-2
        flex
        flex-col
        '>

          <span
          className='
          font-semibold
          text-neutral-800
          text-[1.25rem]
          select-none
          '>
            {profile?.display_name}
          </span>

          <span
          className='
          text-neutral-600/90
          text-[.9rem]
          select-none
          '>
            {profile?.username}
          </span>



        </div>

        { profile?.bio &&
          <div
          className='
          px-5
          pb-1
          '>

              <span
              className='
              text-neutral-700
              text-[.9rem]
              break-words
              '>
                {profile?.bio}
              </span>

          </div>
        }

        <div
        className='
        mx-5 text-[.9rem]
        mb-2
        flex
        gap-3
        '>
          <span
          className='
          text-neutral-500
          cursor-pointer
          text-[.8rem]
          '>
            <span className='mr-1 text-neutral-700'>{`${profile?.followed?.length || "0"}`}</span>Following
          </span>

          <span
          className='
          text-neutral-500
          cursor-pointer
          text-[.8rem]
          '>
            <span className='mr-1 text-neutral-700'>{`${followers || "0"}`}</span>Followers
          </span>
        </div>

        <div
        className='
        max-w-full
        flex
        flex-row
        items-center
        justify-start
        overflow-x-auto
        '>
          {profileSections.map((item : string , idx : number) => {
            return(
              <button
              onClick={() => {
                setSection(item)
              }}
              key={idx}
              className={`
              hover:bg-violet-50
              w-full
              whitespace-nowrap
              px-4
              text-[.9rem]
              text-neutral-700
              grid
              place-items-center
              transition-all
              `}>
                <p
                className={`
                ${
                  section === item ?
                  "border-b-4 border-violet-500 font-medium"
                :
                  "border-b-4 border-transparent"
                }
                py-2
                px-1
                w-fit
                transition-all
                `}>
                  {item}
                </p>
              </button>
            )
          })}
        </div>

      </div>

          {(() => {
            switch(section){
              case("Posts") : 
              return(
                <OnlyPosts
                username={profile?.username}
                />
              )

              case("Posts & Replies") : 
              return(
                <UserPosts
                username={profile?.username}
                />
              )

              case("Likes") : 
              return(
                <LikedPosts
                username={profile?.username}
                />
              )

              default :
              return <></>
            }
          })()}

    </div>
  )
}

export default Profile


const profileSections = ["Posts" , "Posts & Replies" , "Likes"];