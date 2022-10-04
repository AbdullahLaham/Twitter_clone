import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import React from 'react'
import { useEffect, useState } from 'react';
import {BsStars} from 'react-icons/bs';
import { db } from '../firebase';
import Input from './Input';
import Post from './Post';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
      setPosts(snapshot.docs);
      console.log('unsubscribe', snapshot.docs)
    });
    
  }, [])
  return (
    <div className='xl:ml-[16rem] border-l border-r xl:min-w-[42rem] sm:ml-[73px] flex-grow max-w-xl h-[100vh] '>
      <div className='flex justify-between p-[.7rem] sticky top-0 z-50 bg-white border-b border-gray-200 '>
        <p className='font-bold text-3xl sm:text-xl cursor-pointer '>Home</p>
        <div className='hoverAnimation flex items-center justify-center px-0 ml-auto ' >
            <BsStars className='text-3xl ' />
        </div>
        
      </div>
      <Input />
      {posts.map(post => {
        return (
          <Post key={post?.id} post={post} />
        )
      })}
    </div>
  )
}

export default Feed
