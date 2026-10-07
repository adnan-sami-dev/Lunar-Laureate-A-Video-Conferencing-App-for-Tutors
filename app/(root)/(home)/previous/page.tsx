'use client'

import { usePreviousMeetings } from '@/hooks/usePreviousMeetings'
import Loader from '@/components/Loader'
import { useConnectedUser, useStreamVideoClient } from '@stream-io/video-react-sdk'

const Previous = () => {
  const { calls, isLoading, refetch } = usePreviousMeetings() 
  const client = useStreamVideoClient()
  const user = useConnectedUser()
  const userId = user?.id || null
  

  const handleRemove = async (callId: string) => {
    if (!client || !callId || !userId) return

    const call = client.call('default', callId)

    await call.update({
      custom: { [`hidden_${userId}`]: true },
    })
    
    // refresh list
    refetch()
  }

  const handleRemoveAll = async () => {
    if (!client || !userId || calls.length === 0) return

    if (!confirm('Remove all previous meetings from your list?')) return

    await Promise.all(
      calls.map((call) =>
        client.call('default', call.id).update({
          custom: { [`hidden_${userId}`]: true },
        })
      )
    )

    refetch()
  }

  return (
    <section>
      <div className='flex items-center justify-between mb-10'>
        <h1 className='font-bold text-5xl max-sm:text-center'>Previous</h1>
        
        {!isLoading && calls.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className='text-sm font-medium px-4 py-2 rounded-xl
                      bg-white/50 hover:bg-white/30 hover:text-red-700
                      transition-colors cursor-pointer'
          >
            Remove all
          </button>
        )}
      </div>

      {
        isLoading ? (<Loader />)
        
        : calls.length === 0? ( <p>No Previous Meetings</p>)
          
        : (
            <ul>
              {
                calls.map( (call) => {
                  const startsAt = call.state.startsAt ? new Date(call.state.startsAt) : null

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

                      {/* remove call from list */}
                      <button
                        onClick={() => handleRemove(call.id)}
                        className='font-medium text-sm bg-white/40 hover:bg-white/30 cursor-pointer p-5 rounded-2xl
                         hover:text-red-700 transition-colors'
                      >
                        Remove
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

export default Previous