'use client'

import { useParams } from 'next/navigation'
import { useUser } from '@clerk/react'
import { useState } from 'react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'

const MeetingPage = () => {
  const {id} = useParams()
  const idString = String(id)

  // why do we need current user ?
  const {user, isLoaded} = useUser()

  // state for updating whether meeting has been set up with audio / video or not
  const [isSetupDone, setIsSetupDone] = useState(false)

  const { call, isCallLoading, error } = useGetCallById(idString)

  if (isCallLoading) {
    return <main className="h-screen w-full">Loading call...</main>
  }

  if (error || !call) {
    return <main className="h-screen w-full">Unable to load call.</main>
  }

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
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