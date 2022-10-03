import Link from 'next/link'
import React from 'react'

const News = ({article}) => {
  return (
    <a href={article?.url} target='_blank' className=' border-b border-gray-300 block py-[.5rem]'>
      <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all duration-200 p-[.1rem] hover:p-[.2rem]'>
        <div>
            <h6 className='text-sm font-bold'>{article?.title}</h6>
            <p className='text-xs font-bold pt-[.1rem] text-gray-500'>{article?.author}</p>
        </div>
        <img className='w-[5rem] h-[5rem] object-cover rounded-md' src={article?.urlToImage} />
      </div>
    </a>
  )
}

export default News
