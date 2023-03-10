import React , { useState , useEffect} from 'react'
import { useGetPost } from '../hooks'
import { useGetUserProfile } from '../../auth/hooks'
import { RiRepeatFill, RiUserLine } from 'react-icons/ri'
import TimeFormater from '../../../utils/timeFormater'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import HorizontalActionBar from './HorizontalActionBar'
import { Link, useNavigate } from 'react-router-dom'
import VeriticalActionBar from './VeriticalActionBar'
import SkeletonPostCard from './SkeletonPostCard'
import { getFile } from '../../storage/utils'
import PostCard from './PostCard'

type props = {
  postId : string,
  reposterId : string,
  parent : string,
  content : string
}
const Repost : React.FC<props> = ({
  postId,
  reposterId,
  parent,
  content,
}) => {
  const navigate = useNavigate()
  const user : any = useSelector((state : rootType) => state.AuthSlice.user);
  const [show , setShow] = useState<boolean>(false)

  const [post,err,pending] : any = useGetPost(content ? postId : parent);
  const [reposter] : any = useGetUserProfile(reposterId || "");
  const [profile] : any= useGetUserProfile(post?.created_by || "");
  const pp = getFile("profiles" , profile?.profile_picture || "")

  let time = TimeFormater(post?.created_at || "")

  if(
    pending || 
    !post || 
    !profile ||
    !reposter
  ) return(
    <SkeletonPostCard/>
  )

  return (
      <div
      onClick={(e) => {
        e.stopPropagation()
        navigate("/post/" + post?.ID)
      }}
      className='
      bg-white md:hover:bg-violet-50
      transition-colors
      flex flex-col
      border-b-[1px] border-color
      cursor-pointer
      '>

        { !content &&
          <span
          className='
          ml-3 py-1 flex
          items-center
          text-[.9rem]
          font-normal
          text-neutral-600
          gap-1
          '>

            <div
            className='
            text-[.8rem]
            mr-1
            '>
              <RiRepeatFill/>
            </div>

            { reposter?.uid === user ?
            <span>
              You reposted
            </span>
            :
            <>
              <p>{"reposted by"}</p>
              <Link
              onClick={(e) => e.stopPropagation()}
              className='
              text-violet-500
              hover:underline
              '
              to={"/profile/" + reposter?.username}>
                {reposter?.username}
              </Link>
            </>
            }

          </span>
        }

        <div
        className={`
        flex w-full relative
        ${content ? "mt-3" : ""}
        `}>
    
            {/* Left section of post*/}
    
            <div
            className='relative'>
    
              { pp ? <img
                  src={`${pp ? pp : ""}`}
                  draggable="false"
                  className="
                  z-[9] relative
                  rounded-full
                  w-[45px] h-[45px] object-cover
                  m-3 mt-0
                  "
                  /> 
                  :
                  <div
                  className='
                  w-[45px] h-[45px] flex items-center justify-center
                  bg-violet-200 rounded-full
                  text-violet-dark text-[1.25rem] m-3 mt-0
                  '>
                      <RiUserLine/>
                  </div>
              }
    
            </div>
            
            {/* Left section of post*/}
    
            <div
            className='
              relative
              w-[calc(100%_-_75px)]
              mb-3 pl-1
            '>
    
              {/* Top section for post */}
              <div
              className='
              relative
              flex w-[100%] pr-4
              '>
    
                <p
                className='
                font-medium
                text-neutral-700
                text-[.9rem]
                overflow-hidden text-ellipsis
                '>
                  {profile?.display_name.toString() || "..."}
                </p>
    
                <Link
                onClick={(e) => e.stopPropagation()}
                to={"/profile/" + profile?.username}
                className='
                mx-1 font-normal
                text-neutral-500
                text-[.9rem]
                overflow-hidden text-ellipsis
                hover:underline
                '>
                  {profile?.username.toString() || "..."}
                </Link>
    
                <p
                className='
                mx-1 font-normal
                text-neutral-500
                text-[.8rem]
                overflow-hidden text-ellipsis
                '>
                  {time || "..."}
                </p>
    
                <VeriticalActionBar
                ID={postId}
                created_by={reposter?.uid}
                creator={reposter}
                />
    
              </div>
    
              {/* Content section for post */}
              <div
              className='
              relative w-[100%] pr-4
              '>
                <p
                dir={post?.content.split("").filter((item : string) => /[??-??]/.test(item)).length > post?.content.split("").filter((item : string) => /[a-zA-Z]/.test(item)).length ?
                "rtl" : 
                "ltr"}
                className='
                break-words text-neutral-700
                text-[.9rem]
                '>
                { post?.content.replaceAll("\n"," \n ").split(" ").map((item : string , idx : number) => {
                if(item === "\n") return <br key={idx}/>

                if(/^#[a-zA-Z0-9_??-??]{1,}$/.test(item)) 
                return(
                <Link
                onClick={(e) => e.stopPropagation()}
                to={"/explore/"+item.replaceAll(/[^a-zA-Z0-9_??-??]/g, '') }
                key={idx}
                className='
                text-violet-600
                hover:underline
                '
                >
                {item + " "}
                </Link>)

                if(/^@[a-zA-Z0-9_??-??]{1,}$/.test(item)) 
                return(
                <Link
                onClick={(e) => e.stopPropagation()}
                to={"/profile/"+ item }
                key={idx}
                className='
                text-violet-600
                hover:underline
                '
                >
                {item + " "}
                </Link>)

               return (
                <span
                key={idx}>
                  {item + " "}
                </span>
               )

               }) || "" 
                }
                </p>
              </div>
    
              <HorizontalActionBar
              post={post}
              user={user}/>
    
            </div>
    
        </div>
        
        { content ? 
          <div
        className='
        w-[90%]
        mx-auto
        overflow-hidden
        rounded-md
        border-[1px]
        mb-3
        border-color
        '
        >
          <PostCard
          ID={parent}
          sx="border-none"
          />
          </div>
          :
          <></>
        }

      </div>
  )
}

export default Repost