'use client'

import { 
  DeviceSettings, 
  useCall, 
  VideoPreview, 
  useCallStateHooks 
} from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'

const MeetingSetup = ({setIsSetupDone} : {setIsSetupDone : (setupDone: boolean) => void}) => {
  const call = useCall()
  const [isVideoAudioEnabled, setIsVideoAudioEnabled] = useState(true)

  const { useCameraState, useMicrophoneState } = useCallStateHooks()
  const { 
    hasBrowserPermission: hasCamPermission,
  } = useCameraState()
  const { 
    hasBrowserPermission: hasMicPermission,
  } = useMicrophoneState()

  if (!call) throw new Error("no call")

  const permissionsBlocked = hasCamPermission === false && hasMicPermission === false

  useEffect(() => {
    const toggleDevices = async () => {
      if (isVideoAudioEnabled && hasCamPermission && hasMicPermission) {
        await call.camera.enable()
        await call.microphone.enable()
      } else if (!isVideoAudioEnabled) {
        await call.camera.disable()
        await call.microphone.disable()
      }
    }
    toggleDevices()
  }, [isVideoAudioEnabled, hasCamPermission, hasMicPermission, call.camera, call.microphone])


  if (permissionsBlocked) {
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-4 text-primary-text p-6'>
        <h1 className='text-2xl font-bold text-center'>Camera & Microphone Blocked</h1>
        <p className='text-center max-w-md opacity-80 bg-secondary-background p-4 rounded-2xl'>
          Your browser has blocked access to your camera and microphone. 
          To join the call, please enable permissions in your browser settings.
        </p>
        <p className='mt-3 text-xs opacity-60'>After enabling, refresh this page.</p>
      </div>
    )
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium text-primary-text'>
          <input 
            type='checkbox'
            checked={isVideoAudioEnabled}
            onChange={(e) => setIsVideoAudioEnabled(e.target.checked)}
          />
          mic and camera
        </label>
        <DeviceSettings />
      </div>

      <button className='flex items-center text-sm justify-center text-primary-text font-bold border-primary-text border-2 
      bg-sidebar-hover hover:bg-secondary-background rounded-2xl py-2 px-3 cursor-pointer'
      onClick = {() => {
        call.join()
        setIsSetupDone(true)
      }}
      >
        Join Meeting
      </button>
    </div>
  )
}

export default MeetingSetup