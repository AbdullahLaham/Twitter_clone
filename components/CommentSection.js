import React, { useEffect } from 'react'
import {Snapshot, useRecoilState} from 'recoil'
import { modalState, postIdlState } from '../atom/commentAtom'
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import { data } from 'autoprefixer';
import Moment from 'react-moment';
import { TbPhoto } from 'react-icons/tb';
import { BiHappy } from 'react-icons/bi';
import { useRouter } from 'next/router';
import Image from 'next/image';
const CommentSection = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const [postId] = useRecoilState(postIdlState);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState({});
    const [input, setInput] = useState("");
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    // router
    const router = useRouter();

    useEffect(() => {
      console.log('postId', postId)
      const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => {
        setPosts(snapshot.docs);
        snapshot.docs.map((post) => {
          if (post?.id === localStorage.getItem('id')) {
            setPost(post)
         }  
       })

      });
      setCurrentUser(JSON.parse(localStorage.getItem('user')))
    }, [postId]);

    

    const sendComment = async () => {
      setLoading(true);
      await addDoc(collection(db, "posts", localStorage.getItem('id'), "comment"), {
        
        comment: input,
        name: currentUser?.userName,
        userName: currentUser?.email,
        userImg: currentUser?.image,
        timestamp: serverTimestamp(),

      });
      setOpen(false);
      setInput("");
      setLoading(false);
      router.push(`/post/${localStorage.getItem('id')}`)
    }
  return (
    <>
          {open && (
            <Modal isOpen={open} onRequestClose={() => setOpen(false)} className='max-w-lg w-[90%] h-[300px] absolute left-[50%] translate-x-[-50%] border-1 border-gray-400 bg-white rounded-xl top-24'>
                <div className='p-2'>
                    <div className='border-gray-200'>
                        <div className='hoverAnimation w-9 pt-[-.2rem] h-9 flex items-center justify-center absolute left-5 top-2'>
                            <p onClick={() => setOpen(false)} className='text-[22px] text-gray-500 cursor-pointer text-3xl'><AiOutlineClose /></p>
                        </div>
                        <div className='mt-[3rem]'>

                          <span className="w-0.5 h-[3rem] z-[-1] absolute left-7 top-[6.1rem] bg-gray-300" />
                          <p className='absolute top-[6.5rem] left-[4.2rem] text-gray-500 '>{post?.data()?.text}</p>
                          <div className='mr-[.5rem] flex items-center gap-2'>
                            
                            <Image layout='fill' src={post?.data().userImg} className='3-[4rem] h-[3rem] rounded-full object-cover'  />
                            <div className='flex items-center justify-between'><div className='flex items-center whitespace-nowrap'><p className='mr-[.5rem] cursor-pointer font-bold'>{post?.data()?.name}</p><p className='mr-[.5rem]'>{post?.data()?.username}</p><p className='mr-[.5rem] hover:underline hover:cursor-pointer text-sm '><Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment></p> </div></div>
                          </div>
                          <div className='flex items-center  justify-start mt-[2rem]'>
                            <div className=' object-cover cursor-pointer hover:brightness-95 mt-[-1.2rem]'><Image layout='fill' src={currentUser?.image} className='w-[3rem] h-[3rem] rounded-full' /></div>
                            <textarea  placeholder='Tewet your reply' value={input} onChange={(e) => setInput(e.target.value)} className='max-h-[8rem] text-gray-500 resize-none text-[1.2rem] placeholder-gray-600 tracking-wide  min-w-[20rem] form-textarea border-none focus:ring-0 ' ></textarea>
                          </div>
                          <div className='flex items-center justify-between pt-2.5 border-t '>
                            <div className='flex items-center justify-start'>
                                <div>
                                  <label for='image'><TbPhoto className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' /></label>
                                  <input type='file' className='hidden' id="image" name='postImage' onChange='' />
                                </div>
                                <BiHappy className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' />
                            </div>`
                            <button disable={!input.trim()} onClick={sendComment} className={`disabled:opacity-50 text-center bg-blue-500 text-white rounded-full shadow-md cursor-pointer w-[5rem] h-12 hover:brightness-95 text-lg ${loading && "animate-pulse pre"}`}>
                                Reply
                            </button>
                          </div>
                        </div>
                        
                    </div>
                    {/* <h1>{postId}</h1> */}
                </div>
            </Modal>
            )}
    </>
  )
}

export default CommentSection
