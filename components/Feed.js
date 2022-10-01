import React from 'react'
import {BsStars} from 'react-icons/bs';
const Feed = () => {
  return (
    <div className='xl:ml-[15rem] border-l border-r xl:min-w-[30rem] sm:ml-[73px] flex-grow max-w-xl h-[100vh] '>
      <div className='flex justify-between p-[.7rem] sticky top-0 z-50 bg-white border-b border-gray-200 '>
        <p className='font-bold text-3xl sm:text-xl cursor-pointer '>Home</p>
        <div className='hoverAnimation flex items-center justify-center px-0 ml-auto ' >
            <BsStars className='text-3xl ' />
        </div>
      </div>
    </div>
  )
}

export default Feed
