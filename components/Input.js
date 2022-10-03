import React from 'react'
import { BiHappy} from 'react-icons/bi'
import {TbPhoto} from 'react-icons/tb'
const Input = () => {
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3'>
        {/* user image */}
      <div className='p-[.5rem] h-[10rem] cursor-pointer hover:brightness-95'><p className='w-[3.5rem] h-[3.5rem] rounded-full bg-red-400'></p></div>
      <div className=''>
        <div className='w-[100%] divide-y divide-gray-200 ' >
            <textarea  placeholder='whats happening!' className='max-h-[8rem] min-h-[6rem] text-gray-500 text-[1.2rem] placeholder-gray-600 tracking-wide  min-w-[35rem] mx-auto form-textarea border-none focus:ring-0 ' > </textarea>
        </div>
        <div className='flex items-center justify-between pt-2.5 border-t '>
            <div className='flex items-center justify-start'>
                <TbPhoto className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' />
                <BiHappy className='h-10 w-10 hoverAnimation p-2 text-sky-500 hover:bg-sky-100 text-xl' />
            </div>
            <button disabled className='disabled:opacity-50 text-center bg-blue-500 text-white rounded-full shadow-md cursor-pointer w-[5rem] h-12 hover:brightness-95 text-lg'>
                Tweet
            </button>
        </div>
      </div>  
    </div>
  )
}

export default Input
