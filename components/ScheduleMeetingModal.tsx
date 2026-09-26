'use client'

type ScheduleMeetingProps = {
    isOpen: boolean
    closeModal: () => void
    description: string
    setDescription: (value: string) => void
    dateTime: string
    setDateTime: (value:string) => void
    isLoading: boolean
    scheduleMeetingFunction: () => void
}

// passing a lot of props : Modal stays dumb - no Stream / hooks / logic
const ScheduleMeetingModal = ({
    isOpen,
    closeModal,
    description,
    setDescription,
    dateTime,
    setDateTime,
    isLoading,
    scheduleMeetingFunction
} : ScheduleMeetingProps) => {

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-2xl
         flex items-center justify-center'>
            <div className='w-full max-w-md rounded-2xl bg-white/70 p-6
                text-black font-medium shadow-lg'>
                <h2 className='text-center font-bold text-lg mb-5'>Schedule a Meeting</h2>

                <label className='mb-1 block text-sm'>Description</label>
                <textarea
                    value={description}
                    placeholder='eg.lecture on Mitosis'
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    
                    className='outline:none resize-none mb-4 w-full rounded-lg bg-white/70 p-4'
                />

                <label className='mb-1 block text-sm'>Date & Time</label>
                <input 
                    type='datetime-local'
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className='mb-6 w-full rounded-lg bg-amber-950/20 p-4 text-sm outline-none'
                />

                <div className='flex justify-center gap-2'>
                    <button 
                        onClick={closeModal}
                        className='rounded-xl bg-red-600/30 px-3 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>

                    <button 
                        onClick = {scheduleMeetingFunction}
                        disabled = {!dateTime}
                        className = 'disabled:opacity-50 disabled:cursor-default rounded-xl cursor-pointer \
                         bg-green-600/30 px-3 py-2'
                    >
                        {isLoading? 'Scheduling ...' : 'Schedule'}
                    </button>
                </div>
            </div>
        </div>
    )
    
}



export default ScheduleMeetingModal