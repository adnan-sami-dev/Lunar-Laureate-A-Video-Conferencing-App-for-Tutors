'use client'

import Image from "next/image"
import bannerImgOne from '@/public/terracota.jpg'
import bannerImgTwo from '@/public/fall.jpg'
import Link from "next/link"
import { useState } from "react"
import { RxExternalLink } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";

const Home = () => {
  const firstImgLink = 'https://www.pexels.com/photo/stunning-terraced-rice-fields-in-lush-mountain-valley-28778307/' 
  const secondImgLink = 'https://www.pexels.com/photo/dried-leaves-on-the-ground-14710731/'

  // create a list of objects with image link and source later

  const [bannerImg] = useState(bannerImgTwo)
  const [bannerImgLink] = useState(secondImgLink)


  return (
    <section>
      {/* Hero */}
      <div className='relative overflow-hidden rounded-2xl h-75 flex items-center justify-center w-full'>
        <span className='absolute flex items-center justify-center text-center text-sm lg:text-md mx-5 z-5 font-medium text-white backdrop-blur-xs p-2 rounded-full'>
          "The journey of a thousand miles starts with a single step."
        </span>

        <Link href={bannerImgLink}
         className='absolute bottom-0 right-0 mb-2 mr-3 text-black/50 hover:text-black font-medium backdrop-blur-sm bg-white/40 rounded-full p-2 text-xs z-5'>
          <RxExternalLink />
        </Link>

        <Image src={bannerImg} alt='banner image' className='object-cover opacity-90' fill />
      </div>

      <div className='flex md:flex-row flex-col w-full gap-10 mt-10'>
        <div className='rounded-2xl flex items-center flex-col justify-center md:w-1/2 w-full 
          bg-upcoming-meeting-bg h-75 gap-2 cursor-pointer hover:bg-upcoming-meeting-bg-hover transition-colors duration-300 ease-in-out'>
          <span className='text-sm'>Next Meeting at</span>
          <span className='text-5xl font-bold'>
            10:15 AM
          </span>
          <span className='text-xl font-medium'>Thursday, Aug 25</span>
        </div>
        <div className='flex flex-col md:w-1/2 w-full gap-5 font-bold h-75'>
          <div className='bg-create-join-buttons h-1/2 rounded-2xl flex items-center justify-center 
            cursor-pointer hover:bg-create-join-buttons-hover transition-colors duration-300 ease-in-out'>
            <IoMdAdd size={24} /> 
            <span className='ml-2'>Create a Meeting</span>
          </div>
          <div className='bg-create-join-buttons h-1/2 rounded-2xl flex items-center justify-center 
            cursor-pointer hover:bg-create-join-buttons-hover transition-colors duration-300 ease-in-out'>
            Join a Meeting
          </div>
        </div>
      </div>

    </section>
  )
}

export default Home