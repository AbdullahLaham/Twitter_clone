import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {BsSearch} from 'react-icons/bs';
import News from './News';
const Widgets = ({newNews, randomUsers}) => {
  const [articleLength, setArticleLength] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [usersNum, setUsersNum] = useState(3);
  useEffect(() => {
    showAll ? setArticleLength(newNews.length) : setArticleLength(3)
  }, [showAll])
  return (
    <div className='w-[100%] mt-[0rem] hidden lg:block sticky top-0'>
      <div className='sticky top-0 bg-white h-[4.8rem]' >
        <div className='flex items-center p-3 rounded-full relative ' >
            <BsSearch className='h-5 absolute left-[20px] z-10  ' />
            <input type='text' placeholder='Search Twitter' className=' rounded-full  pl-[2.5rem] focus:shadow-lg focus:bg-white w-[100%] sticky top-0 space-y-5  bg-blue-50 border-none outline-none ' />
        </div>
      </div>
      <div className='text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-1 ml-[1rem] w-[90%] xl:w-[75%] px-2 '>
        <h4 className='font-bold text-xl px-2 '>What's happening</h4>
        {newNews.map((news, i) => {
          return (
            i < articleLength  && <News key={i} article={news} />
          )
        })}
        <button className='px-2 text-blue-400 hover:text-blue-500 cursor-pointer' onClick={() => {setArticleLength(newNews.length); setShowAll(!showAll)}}>{articleLength > 3 ? "Show Less" : "Show More"}</button>
      </div>
      <div className=' text-gray-700 space-y-3 mt-[2rem] bg-gray-100 rounded-xl pt-1 ml-[1rem] w-[90%] xl:w-[75%] px-2 '>
        <h4 className='font-bold text-xl px-2 '>Who to follow</h4>
        {
          randomUsers.map((user, i) => {
            return i < usersNum && <div className='flex items-center justify-between' key={i} >
              <img className='rounded-full object-cover mr-[.5rem]' width='40' src={user.picture.thumbnail} />
              <div className='w-[100%] flex flex-col items-start'>
                <p>{user.login.username}</p>
                <p className='text-gray-400'>{user.name.first.split(" ")[0]} {user.name.last.split(" ")[0]}</p>
              </div>
              <button className=' text-center bg-[#000] text-white rounded-full shadow-md cursor-pointer w-[5rem] px-[.5rem] h-8 hover:brightness-95 text-lg'>Follow</button>
            </div>
          })
        }
        <button className='px-2 text-blue-400 hover:text-blue-500 cursor-pointer' onClick={() => {setUsersNum(usersNum+3)}}>Show More</button>
      </div>
      
    </div>
  )
}

export default Widgets
