'use client'

import { useRouter } from 'next/navigation'
import { useUpcomingMeetings } from '@/hooks/useUpcomingMeetings'
import Loader from '@/components/Loader'

const Upcoming = () => {
  const router = useRouter()
  const { calls, isLoading } = useUpcomingMeetings() 

  return (
    <section>
      <h1 className='font-bold text-5xl'>Upcoming</h1>

      {
        isLoading ? ( <p><Loader /></p> )
        
        : calls.length === 0? ( <p>No Upcoming Meetings</p>)
          
        : (
            <ul>
              {
                calls.map( (call) => {
                  const startsAt = new Date(call.state?.startsAt ?? Date.now())
                  
                  return (
                    <li key={call.id}>
                      <div>
                        <span>
                          {call.state.custom?.description || 'Scheduled Meeting'} 
                        </span>
                        <span>
                          
                        </span>
                      </div>
                      <button>

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