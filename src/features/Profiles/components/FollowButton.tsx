import React , { useState , useEffect, useLayoutEffect} from 'react'
import { useSelector } from 'react-redux'
import type { rootType } from '../../../redux/store'
import { useGetUserProfile } from '../../auth/hooks'
import { CgSpinner } from "react-icons/cg"
import { followUser } from '../../auth/utils'

type props = {
  userID : string
}

const FollowButton : React.FC<props> = ({
  userID
}) => {
  const user : string | null= useSelector((state : rootType) => state.AuthSlice.user);
  const [profile , pending] : any = useGetUserProfile(user || "");
  const [unfollow , setUnfollow] = useState<boolean>(false)
  const [followed , setFollowed] = useState<boolean>(profile?.followed?.includes(userID));

  useLayoutEffect(() => {
    setFollowed(profile?.followed?.includes(userID))
  },[profile])


  if(pending || (!profile))return(
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
    '>
      <CgSpinner
      className='
      animate-spin
      '/>
    </button>
  )

  if(followed)return(
    <button
    onClick={async () => {
      try{
        await followUser(userID || "")
        setFollowed(false)
      }
      catch(err){
        setFollowed(true)
      }
    }}
    onMouseEnter={() => {
      setUnfollow(true)
    }}
    onMouseLeave={() => {
      setUnfollow(false)
    }}
    className={`
    grid
    place-items-center
    h-[35px]
    font-medium
    px-5
    p-1
    rounded-full
    text-[1rem]
    transition-all
    ${unfollow ? "border-red-200 hover:bg-red-50 text-red-500" : "border-neutral-300 hover:bg-neutral-100 text-neutral-600"}
    border-[1px]
    `}>
      {unfollow ? "unfollow" : "Following"}
    </button>
  )

  return (
    <button
    onClick={async () => {
      try{
        await followUser(userID || "")
        setFollowed(true
          )
      }
      catch(err){
        setFollowed(false)
      }
    }}
    className='
    grid
    place-items-center
    h-[35px]
    text-white
    font-medium
    px-5
    p-1
    bg-violet-500
    rounded-full
    text-[1rem]
    hover:bg-violet-600
    transition-all
    '>
      Fallow
    </button>  
  )
}

export default FollowButton