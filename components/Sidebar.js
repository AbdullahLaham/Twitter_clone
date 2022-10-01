import Image from 'next/image'
import React, { useState } from 'react'
import {BsTwitter, BsBookmark, BsListStars} from 'react-icons/bs'
import {AiFillHome, AiOutlineMail, AiOutlineUser} from 'react-icons/ai'
import {FaHashtag} from 'react-icons/fa'
import {FaBell} from 'react-icons/fa'
import {CgMoreO, CgMoreAlt} from 'react-icons/cg'
import {GiFeather} from 'react-icons/gi'
import SidebarLink from './SidebarLink'
const menuItems = [
    {
      text: "Home",
      icon: AiFillHome,
    },
    {
      text: "Explore",
      icon: FaHashtag,
    },
    {
      text: "Notification",
      icon: FaBell,
    },
    {
      text: "Messages",
      icon: AiOutlineMail,
    },
    {
      text: "BookMark",
      icon: BsBookmark,
    },
    {
      text: "Lists",
      icon: BsListStars,
    },
    {
      text: "Profile",
      icon: AiOutlineUser,
    },
    {
      text: "More",
      icon: CgMoreO,
    },
  ];
const Sidebar = () => {
  const [active, setActive] = useState('Home');

  return (
    <div className='hidden sm:flex flex-col items-start justify-between  xl:items-start xl:w-[340px] fixed h-full'>
      <div>
        <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0'>
          <BsTwitter className='text-[#57a9f5] text-3xl' />
        </div>
        <div className='space-y-2.5 mt-4 mb-2.5  flex flex-col '>
          {menuItems.map((item, i) => {
            return (
              <div onClick={() => setActive(item.text)}>
                <SidebarLink  Icon = {item.icon} text={item.text} active={active == item.text}  />
              </div>
            )
          })}
        </div>
        
        
        <button className='hidden xl:block text-center bg-blue-500 text-white rounded-full  cursor-pointer w-[13rem] h-12 hover:brightness-95 text-lg  '>Tweet</button>
        <div className='xl:hidden w-[3rem] p-[1rem] bg-blue-500 text-center  text-white font-bold cursor-pointer rounded-full'>
          <GiFeather/>
        </div>
       
      </div>
      {/* Mini Profile */}
      <div className='flex items-center justify-start text-gray-700 cursor-pointer  hoverAnimation'>
        <AiOutlineUser className='p-[1.5rem] bg-red-500 text-white rounded-full mr-[.3rem]'/>
        <div className='hidden lg:flex items-center justify-start text-gray-700 cursor-pointer  hoverAnimation'>
          <div>
            <h4 className='font-bold'>Abdullah lahham</h4>
            <p className='text-gray-500'>ffff5555@gmail.com</p>
          </div>
          <CgMoreAlt className='text-3xl ml-[.3rem] ' />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
