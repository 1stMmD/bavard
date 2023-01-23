import React , { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import { useGetUserProfile } from '../../auth/hooks'
import { ImageInput, LimitedInput, TextArea } from '../../../components/inputs'
import { getFile } from '../../storage/utils'
import { RiCloseFill } from 'react-icons/ri'
import { activateProfileEditor } from '../../../redux/PopupSlice'
import { Input } from "../../../components/inputs"
import { checkForUserName, updateProfile } from '../../auth/utils'
import { data } from '../../../data/interests'
import CheckBox from '../../../components/inputs/CheckBox'
import { FullWidthButton } from '../../../components/buttons'

const EditProfile = () => {
  const profileEditor = useSelector((state : rootType) => state.PopupSlice.profileEditor)
  const user = useSelector((state : rootType) => state.AuthSlice.user)
  const dispatch = useDispatch()
  const [profile , pending] : any= useGetUserProfile(user || "")

  const [name , setName] = useState<string>(profile?.display_name || "")
  const [username , setUserName] = useState<string>(profile?.username || "")
  const [bio , setBio] = useState<string>(profile?.bio || "")
  const [profilePicture , setProfilePicture] = useState<string | ArrayBuffer | File | null>(null)
  const [pictureURL , setPictureURL] = useState<string | null>(profile?.profile_picture || "")
  const [interests , setInterests] = useState<string[]>(profile?.interests || [])
  
  const [loading , setLoading] = useState<boolean>(false)
  
  useEffect(() => {
    setName(profile?.display_name || "")
    setUserName(profile?.username.replace("@","") || "")
    setBio(profile?.bio || "")
    setPictureURL(profile?.profile_picture || "")
    setInterests(profile?.interests || [])
  }, [profile , profileEditor])
  
  if(!profileEditor) return <></>

  return (
    <div
    className={`
    top-0
    fixed
    w-full
    h-fit
    min-h-full
    max-h-full
    bg-black/50
    z-50
    p-4
    flex
    flex-col
    items-center
    overflow-y-auto
    `}>

        <div
        className='
        w-[min(400px,100%)]
        bg-white
        rounded-md
        relative
        flex
        flex-col
        justify-center
        p-2
        my-auto
        '>
            <button
            onClick={() => {
              dispatch(activateProfileEditor(false))
            }}
            type='button'
            className='
            text-[1.25rem]
            p-1
            w-fit
            text-violet-dark
            hover:bg-neutral-200
            rounded-full
            '>
              <RiCloseFill/>
            </button>

            <span
            className='
            text-neutral-700
            font-medium
            xs:mx-[2rem]
            '>
              PROFILE PICTURE
            </span>

            <ImageInput
            defaultURL={getFile("profiles", pictureURL || "")}
            setDefaultURL={setPictureURL}
            value={profilePicture}
            setValue={setProfilePicture}
            sx='mx-auto mb-[.5rem]'
            />

            <span
            className='
            text-neutral-700
            font-medium
            xs:mx-[2rem]
            '>
              NAME
            </span>

            <Input
             setValue={setName}
             value={name}
             placeholder=""
             validationFunc={(data) => {
              if(data?.length > 16){
                return false
              }
              return true
             }}
             sx="mb-[.5rem] xs:mx-[2rem] w-auto"
            />

            <span
            className='
            text-neutral-700
            font-medium
            xs:mx-[2rem]
            '>
              USERNAME
            </span>

            <Input
             setValue={setUserName}
             value={username}
             placeholder=""
             validationFunc={async (data) => {
              if(data === profile?.username?.replace("@","")) return true
              
              let bool = await checkForUserName(data)
              return bool
             }}
             sx="mb-[.5rem] xs:mx-[2rem] w-auto"
            />

            <span
            className='
            text-neutral-700
            font-medium
            xs:mx-[2rem]
            '>
              BIO
            </span>

            <LimitedInput
            value={bio}
            setValue={setBio}
            placeholder="Who are you?"
            sx="xs:mx-[2rem] mb-[.5rem] w-auto"
            limit={120}
            />

            <span
            className='
            text-neutral-700
            font-medium
            xs:mx-[2rem]
            my-[.5rem]
            '>
              INTERESTS
            </span>

            <div
            className='
            xs:mx-[2rem]
            '>
            {
              data?.map((item , idx) => {
                return(
                  <div
                  className={`
                  ${idx === 0 ? "" : "mt-[1rem"}
                  `}>
                    <span
                    key={idx.toString() + item}
                    className='
                    mb-[.5rem]
                    text-[1rem]
                    font-medium
                    text-neutral-700
                    '>
                      {item?.category}
                    </span>

                    <div
                    key={idx}
                    className='
                    flex 
                    flex-wrap
                    gap-x-3
                    gap-y-4
                    '>
                      {
                        item?.values?.map((item , idx) => {
                          return(
                            <CheckBox
                            checked={interests?.includes(item)}
                            key={idx.toString() + item}
                            value={item}
                            onChange={(e) => {
                              e.target.checked ?
                              setInterests(prev => [...prev,item])
                              :
                              setInterests(prev => {
                                let array = [...prev];
                                array.splice(array.findIndex((v) => v === item),1)
                                return [...array]
                              })
                            }}
                            />
                          )
                        })
                      }
                    </div>
                  </div>
                  )
                })
              }
            </div>

            <FullWidthButton
            loading={loading}
            onClick={async () => {
              try{
                setLoading(true)
                await updateProfile(
                  name,
                  username,
                  bio,
                  interests,
                  profilePicture,
                  profile
                )
                setLoading(false)
              }
              catch(err){
                setLoading(false)
              }
            }}
            sx="
            xs:mx-[2rem]
            mt-[1rem]
            w-auto
            mb-1
            "
            title="Save"
            />

        </div>

    </div>
  )
}

export default EditProfile