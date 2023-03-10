import React , { useState } from 'react'
import {Login , Signup} from "../features/auth"
import useSidebarChanger from '../hooks/useSidebarChanger'

const Auth : React.FC = () => {
  const [isLogin , setIsLogin] = useState<boolean>(true)
  useSidebarChanger("Login")
  return (
    <div className="flex flex-row w-[100%]">

        <div className="
        hidden sm:block md:w-[40%]
        lg:w-[50%]
        h-screen
        bg-violet-500
        "/>

        <div
        className='
        w-full md:w-[60%] h-screen
        lg:w-[50%]
        flex flex-col items-center relative
        '>
          
          <div
          className={`
          rounded-full bg-violet-50 mt-4
          `}>

            <button
            onClick={() => {
                setIsLogin(true)
            }}
            className={`
            py-2 px-6 rounded-full
            ${isLogin ? "bg-violet-300 text-[#0B0033]" : "text-neutral-700 hover:bg-violet-200"}
            cursor-pointer
            `}>
                Login
            </button>

            <button
            onClick={() => {
                setIsLogin(false)
            }}
            className={`
            py-2 px-6 rounded-full
            ${isLogin ? "text-neutral-700 hover:bg-violet-200" : "bg-violet-300 text-[#0B0033]"}
            cursor-pointer
            `}>
                Signup
            </button>

          </div>

          {isLogin ? <Login/> : <Signup/>}

        </div>

    </div>
  )
}

export default Auth