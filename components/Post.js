import React from 'react'
import {CgMoreAlt} from 'react-icons/cg';
import {FaRegCommentDots} from 'react-icons/fa';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {FiShare2} from 'react-icons/fi'
import {TbBrandGoogleAnalytics} from 'react-icons/tb'
import {FiTrash2} from 'react-icons/fi';
import Moment from 'react-moment';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { async } from '@firebase/util';
import { deleteObject, ref } from 'firebase/storage';

const Post = ({post}) => {
  // the current user
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  // adding like to the post function
  const addLike = async () => {

    if (isLiked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", currentUser?._id));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", currentUser?._id), {
        username: currentUser?.userName,
      });
    }

  }
  // deleting the post function
  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post!")) {
      // deleting from firestore database
      await deleteDoc(doc(db, "posts", post?.id))
      // deleting the image from firebase Storage
      await deleteObject(ref(storage, `posts/${post?.id}/image`))
    }
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts", post?.id, "likes")), (snapshot) => {
      setLikes(snapshot.docs);
      console.log('unsubscribe', snapshot.docs)
    });
    
  }, [db])
  useEffect(() => {

    setIsLiked(likes.findIndex((like) => like.id === currentUser?._id) !== -1);
    console.log('isLiked', post?.id ,  isLiked)
  }, [likes, currentUser])
  return (
    <div className='flex justify-start mb-[2rem] p-[1rem]'>
      <div className='mr-[.5rem]'>
        <img src={post?.data()?.userImg} className='w-[4rem] h-[4rem] rounded-full object-cover'  />
      </div>
      <div>
        <div className='flex items-center justify-between'><div className='flex items-center whitespace-nowrap'><p className='mr-[.5rem] cursor-pointer font-bold'>{post?.data()?.name}</p><p className='mr-[.5rem]'>{post?.data()?.username}</p><p className='mr-[.5rem] hover:underline hover:cursor-pointer text-sm '>- <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment></p> </div><div className='p-[.5rem] text-3xl ml-[3rem] hoverAnimation cursor-pointer'><CgMoreAlt className='' /></div></div>
        <p className='text-gray-800 text-[15px] sm:text-[16px] '>{post?.data()?.text}</p>
        <div className='max-h-[25rem] overflow-hidden mt-[1.1rem]'>
            {post.data().image && <img src={post?.data()?.image} className='h-[30rem] w-[30rem] object-cover rounded-md' />}
        </div>
        <div className='flex justify-between p-[1rem] '>
            <div className='text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-blue-200 hover:text-blue-500'>
                <FaRegCommentDots className='cursor-pointer'/>
            </div>
            {currentUser?._id === post?.data()?.id && (<div onClick={deletePost} className='cursor-pointer text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-red-200 hover:text-red-500'>
                <FiTrash2 className='cursor-pointer'/>
            </div>)}
            {<div>
              <div className={`cursor-pointer flex items-center gap-1 text-xl cursor-pointer hoverAnimation p-[1rem] ${isLiked && "text-red-500 bg-red-200 active:text-black active:bg-white"}` }onClick={addLike}>
                <BsFillSuitHeartFill className='cursor-pointer'/>
                <p className='mt-[-.2rem]'>{likes.length > 0 && likes.length}</p>
              </div>
            </div>}
            <div className='text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-blue-200 hover:text-blue-500'>
                <FiShare2 className='cursor-pointer'/>
            </div>
            <div className='text-xl cursor-pointer hoverAnimation hover:bg-blue-200 p-[1rem] hover:text-blue-500 '>
                <TbBrandGoogleAnalytics className='cursor-pointer' />
            </div>
            
        </div>
      </div>

    </div>
  )
}

export default Post
