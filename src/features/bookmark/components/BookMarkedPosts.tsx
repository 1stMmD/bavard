import React , { useState } from 'react'
import { useGetBookmarkedPosts } from '../hooks'
import { Post } from '../../posts'

type props = {
    posts : any 
}

const BookMarkedPosts : React.FC<props> = ({
    posts
}) => {
  
  return (
    <div>
        {posts?.map((item : any , idx : number) => {
            return(
                <Post
                key={idx}
                ID={item?.ID}
                />
            )
        })}
    </div>
  )
}

export default BookMarkedPosts