/**
 * MEETING ROOM — END/LEAVE STATE CHEAT SHEET
 *
 * Why the toast logic looks the way it does:
 *
 * 1. Two things can end a user's session:
 *      - The user leaves or ends the call  -> onLeave fires
 *      - The owner ends it for everyone    -> call.ended fires
 *
 * 2. Both can fire at nearly the same time, so we DON'T trust the event
 *    to tell us which one happened. We let either event fire a single
 *    handler, then read the truth from the call itself.
 *
 * 3. SOURCE OF TRUTH:
 *      call.state.endedAt  -> truthy = call was ended for everyone
 *                          -> falsy  = user just left
 *
 * 4. Rule of thumb for real-time apps:
 *      Events are triggers. State is truth.
 *      Never derive meaning from which event fired first.
 *
 * 5. Also: the toast must live in MeetingRoom (not in ResponsiveCallControls)
 *    because ResponsiveCallControls unmounts when callingState becomes LEFT,
 *    taking any local state with it.
 */

import { useCall, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks, CallingState } from "@stream-io/video-react-sdk"
import { useState, useEffect } from "react"
import ResponsiveCallControls from "./ResponsiveCallControls"
import Dropdown from "./Dropdown"
import DropdownItem from "./DropdownItem"
import BackToHomeToast from "./BackToHomeToast"
import useActiveCalls from "@/hooks/useActiveCalls"

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setShowParticipants] = useState(false)

  const {activeCall, isLoading} = useActiveCalls()

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const call = useCall()

  const [homeToast, setHomeToast] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  })

  // Single handler — reads truth from call.state.endedAt
  const showHomeToast = () => {
    const ended = !!call?.state.endedAt
    setHomeToast({
      open: true,
      message: ended ? 'Call ended' : 'Call left',
    })
  }

  // Remote end (owner ended it while you were in)
  useEffect(() => {
    if (!call) return
    const unsub = call.on('call.ended', showHomeToast)
    return () => unsub()
  }, [call])


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

        {/* participant show div */}
        <div   className={`ml-2 transition-all duration-300 text-white
                          ${showParticipants 
                            ? 'block h-[calc(100vh-86px)]' 
                            : 'hidden'
                          }
        `}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

        <div className='absolute top-0 flex flex-row items-center justify-center gap-3'>

          {/* participants show button */}
          <button className='flex items-center justify-center text-white gap-2 bg-gray-700 px-3 py-2
          rounded-2xl border-2 border-primary-text text-xs cursor-pointer transition-colors duration-300 hover:bg-sidebar-hover'
            onClick={() => setShowParticipants(!showParticipants)}>
              participants
          </button>

          {/* Layout Menu */}
          <Dropdown trigger='layout'>
           <DropdownItem onClick={() => setLayout('grid')}>grid</DropdownItem>
           <DropdownItem onClick={() => setLayout('speaker-right')}>speaker right</DropdownItem>
           <DropdownItem onClick={() => setLayout('speaker-left')}>speaker left</DropdownItem>
          </Dropdown>

        </div>
      </div>

      {/* call controls */}
      {callingState != CallingState.LEFT && (
        <div className='absolute bottom-0 left-0 right-0 z-20'>
          <ResponsiveCallControls onCallEnded={showHomeToast} />
        </div>
      )}

      {/* Back to Home Toast */}
      <BackToHomeToast
        open={homeToast.open}
        message={homeToast.message}
      />

    </section>
  )
}

export default MeetingRoom