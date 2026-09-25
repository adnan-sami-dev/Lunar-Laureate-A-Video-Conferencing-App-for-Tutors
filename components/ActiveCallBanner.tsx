
import { Call } from "@stream-io/video-react-sdk"

type ActiveCallBannerProps = {
    call: Call,
    onJoin: (callId: string) => void
}

const ActiveCallBanner = ({call, onJoin} : ActiveCallBannerProps) => {

    return (
        <div className='flex items-center justify-center'>
            <div className='fixed bottom-0 mb-4 ml-2 mr-2 flex text-center rounded-lg px-4 py-2
            bg-red-300 text-black'>
                <div className='flex items-center justify-center flex-row gap-4'>
                    <span className='font-medium'>You have an ongoing call</span>
                    <button className='bg-amber-200 text-black px-4 py-2 rounded-lg font-bold
                    cursor-pointer hover:bg-amber-300 transition-colors duration-300'
                    onClick={() => onJoin(call.id)}>
                        Join
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ActiveCallBanner