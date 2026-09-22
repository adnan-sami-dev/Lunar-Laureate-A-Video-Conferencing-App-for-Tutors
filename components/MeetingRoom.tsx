

import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk"
import { useState } from "react"
import ResponsiveCallControls from "./ResponsiveCallControls"

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)

  const CallLayout = () => {
    switch (layout) {
      case 'grid' :
        return <PaginatedGridLayout />
      
      case 'speaker-right' :
        return <SpeakerLayout participantsBarPosition={'left'} />

      default :
        return <SpeakerLayout participantsBarPosition={'right'} />
    }
  }
  
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white bg-black'>

      {/* layout section */}
      <div className='relative flex size-full items-center justify-center'>
        {/* main layout */}
        <div className='flex size-full max-w-250 items-center'>
          <CallLayout />
        </div>

        {/* participant show */}
        <div   className={`ml-2 transition-all duration-300 text-white absolute top-21.5
                          ${showParticipants 
                            ? 'block h-[calc(100vh-86px)]' 
                            : 'hidden'
                          }
        `}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

        <button className='absolute top-0 flex items-center justify-center text-white gap-2 bg-gray-700 px-3 py-2
        rounded-2xl border-2 border-primary-text text-xs cursor-pointer transition-colors duration-300 hover:bg-sidebar-hover'
          onClick={() => setShowParticipants(!showParticipants)}>
            show participants
        </button>
      </div>

      {/* call controls */}
      <div className='absolute bottom-0 left-0 right-0 z-20'>
        <ResponsiveCallControls />
      </div>

    </section>
  )
}

export default MeetingRoom