'use client'

import { useRouter } from 'next/navigation'
import { useUpcomingMeetings } from '@/hooks/useUpcomingMeetings'
import Loader from '@/components/Loader'

const Upcoming = () => {
  const router = useRouter()
  const { calls, isLoading } = useUpcomingMeetings() 

  return (
    <section>
      <h1 className='font-bold text-5xl mb-10 max-sm:text-center'>Upcoming</h1>

      {
        isLoading ? (<Loader />)
        
        : calls.length === 0? ( <p>No Upcoming Meetings</p>)
          
        : (
            <ul>
              {
                calls.map( (call) => {
                  const startsAt = call.state.startsAt ? new Date(call.state.startsAt) : null
                  const isDue = startsAt
                                  ? new Date(startsAt).getTime() - new Date().getTime() <= 10 * 60 * 1000 
                                  : false


                  return (
                    <li key={call.id}
                      className='bg-create-join-buttons py-5 px-10 mt-5 rounded-2xl flex flex-col sm:flex-row gap-7 items-center justify-between'>

                      <div className='text-center sm:text-start flex flex-col gap-3'>

                        {/* MEETING DESCRIPTION */}
                        <span className='font-medium text-2xl'>
                          {call.state.custom?.description || 'Scheduled Meeting'} 
                        </span>

                        {/* SCHEDULED TIME */}
                        <span className='text-primary-text/80 text-sm'>
                          {startsAt ? (
                            <>
                              {startsAt.toLocaleDateString()}
                              <br /> 
                              {startsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </>
                          ) : (
                            <span>Time not set</span>
                          )}
                        </span>

                      </div>

                      {/* JOIN MEETING BUTTON - CONDITIONAL UPON SCHEDULED MEETING TIME */}
                      <button onClick={() => router.push(`/meeting/${call.id}`)}
                        className='font-medium text-sm bg-white/40 hover:bg-white/30 cursor-pointer p-5 rounded-2xl
                        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40'
                        disabled={!isDue}
                      >
                        {isDue ? 'Join' : "Can't join yet"}
                      </button>

                    </li>
                  )
                })
              }
            </ul>
          )
      }
    </section>
  )
}

export default Upcoming