import React, { useState, useEffect, useRef, useContext } from 'react'
import { BiHappy} from 'react-icons/bi'
import {TbPhoto} from 'react-icons/tb'
import {Store} from '../store'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import {db, storage} from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { upload } from '@testing-library/user-event/dist/upload'
import Image from 'next/image'
const Input = () => {
  // input state 
  const [input, setInput] = useState('');
  const {dispatch, state} = useContext(Store);
  // the selected image state
  const [selectedImage, setSelectedImage] = useState(null);
  console.log('user', state.user)
  const [currentUser, setCurrentUser] = useState({});
  // loading state
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }, [])
  // sendPost function
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser?._id,
      text: input,
      userImg: currentUser?.image,
      timestamp: serverTimestamp(),
      name: currentUser?.userName,
      username: currentUser?.email,
    })
    const imageRef = ref(storage, `posts/${docRef?.id}/image`)
    if (selectedImage) {
      await uploadString(imageRef, selectedImage, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
        
      });
    }
    setLoading(false);
    setInput("")
    setSelectedImage(null);
  }

  // addImageToPost function.
  const addImageToPost = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file)
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
      
    }
    
  }

  return (
    <div className='flex border-b border-gray-200 p-3 pl-[1.5rem] space-x-3'>
        {/* user image */}
      <div className='p-[.5rem] h-[10rem] object-cover cursor-pointer hover:brightness-95'><Image src={currentUser?.image} className='w-[3rem] h-[3rem] rounded-full' /></div>
      <div className=''>
        <div className='w-[100%] divide-y divide-gray-200 ' >
            <textarea  placeholder='whats happening!' value={input} onChange={(e) => setInput(e.target.value)} className='max-h-[8rem] min-h-[6rem] text-gray-500 text-[1.2rem] placeholder-gray-600 tracking-wide  min-w-[35rem] mx-auto form-textarea border-none focus:ring-0 ' ></textarea>
        </div>
        {
          selectedImage && (
            <div className='relative w-[32rem]'>
              <p className='cursor-pointer hoverAnimation text-2xl absolute top-0 left-4 text-white' onClick={() => {setSelectedImage(null)}}>x</p>
              <Image src={selectedImage} className={`w-[100%] m-auto  ${loading && "animate-pulse"} `} />
            </div>
          )
        }
        {!loading && (
          <div className='flex items-center justify-between pt-2.5 border-t '>
            <div className='flex items-center justify-start'>
                <div>
                  <label for='image'><TbPhoto className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' /></label>
                  <input type='file' className='hidden' id="image" name='postImage' onChange={(e) => addImageToPost(e.target.files[0])} />
                </div>
                <BiHappy className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' />
            </div>
            <button disable={!input.trim()} onClick={sendPost} className='disabled:opacity-50 text-center bg-blue-500 text-white rounded-full shadow-md cursor-pointer w-[5rem] h-12 hover:brightness-95 text-lg'>
                Tweet
            </button>
          </div>
        )}
      </div>  
    </div>
  )
}

export default Input
