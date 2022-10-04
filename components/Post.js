import React from 'react'
import {CgMoreAlt} from 'react-icons/cg';
import {FaRegCommentDots} from 'react-icons/fa';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import {FiShare2} from 'react-icons/fi'
import {TbBrandGoogleAnalytics} from 'react-icons/tb'
import {FiTrash2} from 'react-icons/fi';
import Moment from 'react-moment';

const Post = ({post}) => {
  return (
    <div className='flex justify-start mb-[2rem] p-[1rem]'>
      <div className='mr-[.5rem]'>
        <img src={post?.data()?.userImg} className='w-[4rem] h-[4rem] rounded-full object-cover'  />
      </div>
      <div>
        <div className='flex items-center justify-between'><div className='flex items-center whitespace-nowrap'><p className='mr-[.5rem] cursor-pointer font-bold'>{post?.data()?.name}</p><p className='mr-[.5rem]'>{post?.data()?.username}</p><p className='mr-[.5rem] hover:underline hover:cursor-pointer text-sm '>- <Moment fromNow>{post.data().timestamp.toDate()}</Moment></p> </div><div className='p-[.5rem] text-3xl ml-[3rem] hoverAnimation cursor-pointer'><CgMoreAlt className='' /></div></div>
        <p className='text-gray-800 text-[15px] sm:text-[16px] '>{post?.data()?.text}</p>
        <div className='max-h-[25rem] overflow-hidden mt-[1.1rem]'>
            {post.data().image && <img src={post?.data()?.image} className='h-[30rem] w-[30rem] object-cover rounded-md' />}
        </div>
        <div className='flex justify-between p-[1rem] '>
            <div className='text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-blue-200 hover:text-blue-500'>
                <FaRegCommentDots className='cursor-pointer'/>
            </div>
            <div className='text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-red-200 hover:text-red-500'>
                <FiTrash2 className='cursor-pointer'/>
            </div>
            <div className='text-xl cursor-pointer hoverAnimation p-[1rem] hover:bg-red-200 hover:text-red-500'>
                <BsFillSuitHeartFill className='cursor-pointer'/>
            </div>
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
