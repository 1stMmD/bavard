import React , { useState , useRef , useCallback , createRef } from 'react'
import useSidebarChanger from '../hooks/useSidebarChanger'
import { NewPost } from '../features/posts';
import { useGetPosts } from '../features/storage/hooks';
import Loader from '../components/Loader';
import Repost from '../features/posts/components/Repost';
import InfiniteScroll from '../utils/InfiniteScroll';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PostCard from '../features/posts/components/PostCard';

const Home = () => {
  useSidebarChanger("Home")
  const [max , setMax] = useState<number>(10)
  const [data , pending , error , hasMore] = useGetPosts(max)
  const dispatch = useDispatch()
  return (
    <div
    className='
    w-full
    xs:w-[min(calc(100%_-_79px),450px)]
    sm:w-[min(calc(100%_-_14rem),450px)]
    relative border-x-[1px] border-color
    min-h-screen flex flex-col
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
            Home
          </h2>
        </div>
      </div>

      <div
      className="
      w-full relative
      z-[4]
      "
      >

        <NewPost/>

        { data?.map((post : any , idx : number) => {

            if(post?.parent) return(
                <Repost
                key={idx+Math.random()}
                parent={post?.parent}
                postId={post?.ID}
                reposterId={post?.created_by}
                content={post?.content}
                />
            )

            return(<PostCard
            key={idx}
            ID={post?.ID}
            />)

          })
        }     

        {pending &&
        <Loader
        sx='h-fit py-4'/>
        }

        {
          data?.length === 0 && !pending &&
          <>
            <p
            className='
            text-neutral-500
            text-center
            text-[1rem]
            mx-[1rem]
            mt-[1rem]
            '>
              No posts to see lets <Link className="text-violet-500 hover:underline" to="/explore">Explore</Link> the app
            </p>
          </>
        }

        <InfiniteScroll
        setMax={setMax}
        pending={pending}
        data={data}
        hasMore={hasMore}
        />
   
      </div>
      
    </div>
  )
}

export default Home