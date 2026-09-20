

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
        break
      
      case 'speaker-right' :
        return <SpeakerLayout participantsBarPosition={'left'} />
        break

      default :
        return <SpeakerLayout participantsBarPosition={'right'} />
    }
  }
  
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>

      {/* layout section */}
      <div className='relative flex size-full items-center justify-center'>
        {/* main layout */}
        <div className='flex size-full max-w-250 items-center'>
          <CallLayout />
        </div>

        {/* participant show button */}
        <div   className={`ml-2 transition-all duration-300
                          ${showParticipants 
                            ? 'block h-[calc(100vh-86px)]' 
                            : 'hidden'
                          }
        `}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* call controls */}
      <div className='absolute bottom-0 left-0 right-0 z-20'>
        <ResponsiveCallControls />
      </div>

    </section>
  )
}

export default MeetingRoom