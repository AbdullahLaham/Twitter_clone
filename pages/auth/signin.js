import React from 'react';
import {getProviders, signIn} from 'next-auth/react';
import {BsTwitter} from 'react-icons/bs';
import { getAuth, signOut, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase';
import { useRouter } from 'next/router';
import {Store} from '../../store'
import { useContext } from 'react';
const Signin = () => {
    const router = useRouter();
    const {dispatch, state} = useContext(Store);
    const googleSignIn =  (provider) => {
        signInWithPopup(auth, provider)
        const {uid, displayName, photoURL, email} = auth?.currentUser ? auth?.currentUser : {};
        console.log('user', auth?.currentUser)
        const user = {
          _id: uid,
          _type: 'user',
          userName: displayName,
          image: photoURL,
          email,
        }
        localStorage.setItem('user', JSON.stringify(user))
        dispatch({type: 'SIGN_IN', payload: user})
      }
      
      const handleGoogleSignIn = () => {
        try {
          const provider = new GoogleAuthProvider();
           googleSignIn(provider);
           const user = JSON.parse(localStorage.getItem('user'))
           if (user?._id) router.push('/', {replace: true},)
           
        }
        catch(err) {
          console.log(err)
        }
      }
  return (
    <div className='flex justify-center mt-20 h-[100%] items-center space-x-8'>
        <img className='w-[19rem] h-[20rem] object-cover rotate-6 hidden md:inline-flex ' src='https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch13lingotweet.png.twimg.1920.png' alt='twitter on the phone' />
        <div>
            <div className='flex flex-col items-center justify-center my-auto h-[100%]'>
                <BsTwitter className='text-[#57a9f5] text-[8rem] mb-[1.5rem]' />
                <p>This is a social media app</p>
                <button onClick={() => handleGoogleSignIn()} className='text-center  italic my-10 bg-red-400 rounded-lg p-3 text-white text-xl hover:bg-red-500'>Sign In With Google</button>
            </div>
        </div>
    </div>
  )
}

export default Signin
