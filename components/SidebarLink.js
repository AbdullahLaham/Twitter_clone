import React from 'react'
import { useState } from 'react'

const SidebarLink = ({Icon, text, active}) => {
  return (
    <div className={`hoverAnimation flex items-center justify-start text-gray-700 text-[1.3rem] h-[2.3rem] ${active ? "font-bold" : ''} `} >
      <div className='w-[2rem] rounded-full text-center p-[.9rem] mr-[.5rem]'>
        <Icon />
      </div>
      
      <p className='hidden xl:flex'>{text}</p>
    </div>
  )
}

export default SidebarLink
