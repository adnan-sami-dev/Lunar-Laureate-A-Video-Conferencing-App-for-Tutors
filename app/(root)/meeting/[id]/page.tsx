'use client'

import { useParams } from 'next/navigation'
import { useUser } from '@clerk/react'
import { useState } from 'react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'

const MeetingPage = () => {
  const {id} = useParams()

  // why do we need current user ?
  const {user, isLoaded} = useUser()

  // state for updating whether meeting has been set up with audio / video or not
  const [isSetupDone, setIsSetupDone] = useState(false)




  return (
    <main className="h-screen w-full">
      <StreamCall >
        <StreamTheme>
          {
            isSetupDone? <MeetingRoom /> : <MeetingSetup />
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage