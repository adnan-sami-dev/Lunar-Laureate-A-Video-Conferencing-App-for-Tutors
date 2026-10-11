'use client'

import Image from "next/image"
import bannerImgOne from '@/public/terracota.jpg'
import bannerImgTwo from '@/public/fall.jpg'
import Link from "next/link"
import { useState, useEffect } from "react"
import { RxExternalLink } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { TbUserPlus } from "react-icons/tb";
import {useMeetingActions} from "@/hooks/useMeetingActions"
import ActiveCallBanner from "@/components/ActiveCallBanner"
import useActiveCalls from "@/hooks/useActiveCalls"
import { useRouter } from 'next/navigation'
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal"
import { useScheduleMeeting } from "@/hooks/useScheduleMeeting"
import { useUpcomingMeetings } from "@/hooks/useUpcomingMeetings"
import Loader from "@/components/Loader"

const Home = () => {
  const firstImgLink = 'https://www.pexels.com/photo/stunning-terraced-rice-fields-in-lush-mountain-valley-28778307/' 
  const secondImgLink = 'https://www.pexels.com/photo/dried-leaves-on-the-ground-14710731/'

  // import any upcoming meetings
  const { calls, isLoading : isScheduledLoading } = useUpcomingMeetings()
  const nextScheduledMeeting = calls[0]
  const startsAt = nextScheduledMeeting?.state.startsAt ? new Date(nextScheduledMeeting.state.startsAt) : null

  // create a list of objects with image link and source later
  const [bannerImg] = useState(bannerImgTwo)
  const [bannerImgLink] = useState(secondImgLink)
  const {createMeeting} = useMeetingActions()

  // getting states from useScheduleMeeting hook
  const {
        isOpen, setIsOpen,
        description, setDescription,
        dateTime, setDateTime,
        isLoading,
        scheduleMeeting
  } = useScheduleMeeting()


  // fetching active call (created by user) if any
  const { activeCall} = useActiveCalls()
  console.log(activeCall)

  const router = useRouter()

  const handleJoinCall = (callId: string) => {
    // Navigate to your meeting room route
    router.push(`/meeting/${callId}`)
  }

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

        <div className='relative rounded-2xl flex items-center flex-col justify-center md:w-1/2 w-full 
          bg-upcoming-meeting-bg h-75 gap-2 ease-in-out'>

          {/* Display for Upcoming Meeting, if any */}
          {
            isScheduledLoading ? (<Loader />)
            : calls.length === 0? ( <span>No Upcoming Meetings</span>)
            : (
              <div className='flex flex-col gap-3 items-center justify-center'>
                <span className='text-sm'>Next Meeting at</span>
                <span className='text-2xl text-center font-bold flex flex-col gap-3'>
                  {startsAt ? (
                    <> 
                      <span className="text-5xl">
                        {startsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-primary-text/50">
                        {startsAt.toLocaleDateString()}
                      </span>
                    </>
                    ) : (
                      <span>Time not set</span>
                  )}
                </span>
              </div>
            )
          }

          {/* Schedule a Meeting */}
          <div className='absolute bottom-0 mb-2'>
            <button className='bg-black/30 text-amber-50 px-4 py-2 font-bold text-sm cursor-pointer
             hover:bg-black/40 transition-colors duration-300 rounded-lg'
             onClick = {() => setIsOpen(true)}>
              +
            </button>

            <ScheduleMeetingModal 
              isOpen = {isOpen}
              closeModal = {() => setIsOpen(false)}
              description = {description}
              setDescription = {setDescription}
              dateTime = {dateTime}
              setDateTime = {setDateTime}
              isLoading = {isLoading}
              scheduleMeetingFunction = {scheduleMeeting}
            />
          </div>

        </div>

        <div className='flex flex-col md:w-1/2 w-full gap-5 font-bold h-75'>

          <div className='bg-create-join-buttons h-1/2 rounded-2xl flex items-center justify-center 
            cursor-pointer hover:bg-create-join-buttons-hover transition-colors duration-300 ease-in-out'
            onClick={createMeeting}>
            <IoMdAdd size={24} /> 
            <span className='ml-2'>Instant Meeting</span>
          </div>

          <div className='bg-create-join-buttons h-1/2 rounded-2xl flex items-center justify-center 
            cursor-pointer hover:bg-create-join-buttons-hover transition-colors duration-300 ease-in-out'>
            <TbUserPlus size={24} />
            <span className='ml-2'>Join a Meeting</span>
          </div>
        </div>

      </div>

      {/* Active Call Banner */}
      <div>
        {activeCall && <ActiveCallBanner call={activeCall} onJoin={handleJoinCall}/>}
      </div>
    </section>
  )
}

export default Home