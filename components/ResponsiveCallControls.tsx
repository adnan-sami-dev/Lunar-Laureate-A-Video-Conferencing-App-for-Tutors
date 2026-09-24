'use client';

import { useState, useEffect } from 'react';
import {
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ScreenShareButton,
  ReactionsButton,
  DeviceSettings,
  CancelCallConfirmButton,
} from '@stream-io/video-react-sdk';
import { MdMoreHoriz } from 'react-icons/md';

const ResponsiveCallControls = ({onCallEnded} : {onCallEnded : () => void}) => {
  const [showMore, setShowMore] = useState(false);


  return (
      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 p-2">
        {/* Always visible */}
        <ToggleAudioPublishingButton />
        <ToggleVideoPublishingButton />
        
        {/* Medium screens and up */}
        <div className="hidden sm:flex gap-1 sm:gap-2">
          <ScreenShareButton />
          <ReactionsButton />
        </div>
        
        {/* More menu on mobile */}
        <div className="relative sm:hidden">
          <button
            onClick={() => setShowMore(!showMore)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
          >
            <MdMoreHoriz size={20} />
          </button>
          
          {showMore && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex gap-1 p-2 bg-black/80 rounded-lg backdrop-blur">
              <ScreenShareButton />
              <ReactionsButton />
            </div>
          )}
        </div>
        
        {/* Always visible */}
        <DeviceSettings />
          
        <CancelCallConfirmButton
            onLeave={(err) => {
              if (err) return console.error('end/leave failed', err)
              onCallEnded()
            }}
        />

      </div>  
  );
};

export default ResponsiveCallControls;