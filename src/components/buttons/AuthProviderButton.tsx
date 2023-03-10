import React from 'react'

type props = {
    sx? : string,
    onClick : (e : React.MouseEvent<HTMLButtonElement> ) => void ,
    icon : React.ReactNode,
    provider : string
}

const AuthProviderButton : React.FC<props> = ({
     onClick , sx , icon , provider
}) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className={`
        bg-violet-50 text-viol-800 text-[1rem]
        py-[.5rem] w-full rounded-[.25rem] hover:shadow-[0px_4px_8px]
        hover:bg-violet-100 font-medium
        transition-colors delay-150 ease-linear flex 
        justify-evenly items-center shadow-[0px_4px_6px]
        shadow-violet-400/50 hover:shadow-violet-400/70
        ${sx ? sx : ""}
        `}
        >
            
            <p
            className='
            px-[.25rem] text-neutral-700
            '>
                {"Continue with " + provider}
            </p>

            <div
            className='
            text-[1.25rem] px-[.25rem] text-neutral-700
            '>
                {icon}
            </div>

        </button>
  )
}

export default AuthProviderButton