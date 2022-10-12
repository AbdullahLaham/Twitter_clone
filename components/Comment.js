
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
// import { async } from '@firebase/util';
import { deleteObject, ref } from 'firebase/storage';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState, postIdlState } from '../atom/commentAtom';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Comment = ({id, comment, commentId, userId}) => {
    console.log('gggg', comment)
  // the current user
  const [currentUser, setCurrentUser] = useState();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdlState);
  const [comments, setComments] = useState([]);
  // router
  const router = useRouter();
  // adding like to the post function
  const addLikeToComment = async () => {

    if (isLiked) {
      await deleteDoc(doc(db, "posts", id, "comment", commentId, "likes", currentUser?._id));
    } else {
      await setDoc(doc(db, "posts", id, "comment", commentId, "likes", currentUser?._id), {
        username: currentUser?.userName,

      });
    }

  }
  // deleting the post function
  const deleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this post!")) {
      // deleting from firestore database
      await deleteDoc(doc(db, "posts", id, 'comment', commentId))
    }
  }

  
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts", id, "comment", commentId, 'likes')), (snapshot) => {
      setLikes(snapshot.docs);
      console.log('unsubscribe', snapshot.docs)
    });
    
  }, [db, commentId, id])
  useEffect(() => {
    const data = onSnapshot(collection(db, "posts", id, "comment"), (snapshot) => {
      console.log('docs', snapshot.docs)
      setComments(snapshot.docs);
    })

  }, [db, id])
  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === currentUser?._id) !== -1);
    console.log('isLiked',isLiked)
  }, [comments, currentUser, likes, isLiked]);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  return (
    <div className='flex justify-start mb-[2rem] p-[1rem]'>
      <div className='mr-[.5rem]'>
        <Image src={comment?.userImg} className='w-[3rem] h-[3rem] rounded-full object-cover'  />
      </div>
      <div>
        <div className='flex items-center justify-between'><div className='flex items-center whitespace-nowrap'><p className='mr-[.5rem] cursor-pointer font-bold'>{comment?.name}</p><p className='mr-[.5rem]'>{comment?.userName}</p><p className='mr-[.5rem] hover:underline hover:cursor-pointer text-sm '>- <Moment fromNow>{comment?.timestamp?.toDate()}</Moment></p> </div><div className='p-[.5rem] text-3xl ml-[3rem] hoverAnimation cursor-pointer'><CgMoreAlt className='' /></div></div>
        <p className='text-gray-800 text-[15px] sm:text-[16px] '>{comment?.comment}</p>
        
        <div className='flex items-center gap-2 p-[1rem] '>
            
            {comment?.userName === currentUser?.email && (<div onClick={deleteComment} className=' text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-red-200 hover:text-red-500'>
                <FiTrash2 className='cursor-pointer'/>
            </div>)}
            {<div>
              <div className={`cursor-pointer flex items-center gap-1 text-xl  ${isLiked && "text-red-500 active:text-black active:bg-white"}` } onClick={addLikeToComment}>
                <BsFillSuitHeartFill className='cursor-pointer'/>
                <p className='mt-[-.2rem]'>{likes.length > 0 && likes.length}</p>
              </div>
            </div>}
            
            
        </div>
      </div>

    </div>
  )
}

export default Comment
