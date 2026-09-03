'use client'

import Image from "next/image"
import image from '@/public/terracota.jpg'
import fallbackImg from '@/public/fall.jpg'
import Link from "next/link"
import { useState } from "react"

const Home = () => {
  const imageLink = 'https://www.pexels.com/photo/stunning-terraced-rice-fields-in-lush-mountain-valley-28778307/' 

  const [imgSrc, setImgSrc] = useState(image)

  const handleImageError = () => {
    setImgSrc(fallbackImg)
  }

  return (
    <section>
      {/* Hero */}
      <div className='relative overflow-hidden rounded-2xl h-75 flex items-center justify-center w-full'>
        <span className='absolute flex items-center justify-center text-center text-sm lg:text-md mx-5 z-5 font-medium text-white backdrop-blur-xs p-2 rounded-full'>
          "The journey of a thousand miles starts with a single step."
        </span>

        <Link href={imageLink}
         className='absolute bottom-0 right-0 mb-2 mr-3 text-black/50 hover:text-black font-medium text-xs z-5'>
          see the picture
        </Link>

        <Image src={imgSrc} alt='banner image' className='object-cover opacity-80' fill onError={handleImageError}/>
      </div>

    </section>
  )
}

export default Home