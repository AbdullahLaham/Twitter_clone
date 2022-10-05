import React from 'react'
import {useRecoilState} from 'recoil'
import {modalState} from '../atom/commentAtom'
import Modal from 'react-modal';
import {AiOutlineClose} from 'react-icons/ai'
const CommentSection = () => {
    const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className='w-[100%] relative'>
      {open && (
        <Modal isOpen={open} onRequestClose={() => setOpen(false)} className='max-w-lg w-[90%] h-[300px] absolute left-[50%] translate-x-[-50%] border-1 border-gray-400 bg-white rounded-xl top-24'>
            <div className='p-1'>
                <div className='border-gray-200'>
                    <div className='hoverAnimation w-9 pt-[-.2rem] h-9 flex items-center justify-center absolute left-5 top-2'>
                        <p onClick={() => setOpen(false)} className='text-[22px] text-gray-500 cursor-pointer text-3xl'><AiOutlineClose /></p>
                    </div>
                </div>
            </div>
        </Modal>
        )}
    </div>
  )
}

export default CommentSection
