

/*
    1. Get the Stream client.
    2. Get the current user's ID from the client.
    3. Query Stream for calls where this user is a member.
    4. Filter to only "active" ones (ongoing, not ended).
    5. If at least one exists → show banner.
    6. If none → hide banner (render nothing).
    7. Banner shows call info + "Join" button.
    8. Join button navigates to /meeting/{callId}.
*/


import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useState, useEffect } from "react"

const useActiveCalls = () => {
    const [activeCall, setActiveCall] = useState<Call | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const client = useStreamVideoClient()           //
    const userId = client?.streamClient.user?.id    // optional chaining to prevent crashes while user attaches

    useEffect (() => {
        if (!client || !userId) return              // if client or user doesn't exist or can't be retrieved, 
                                                    // don't attempt to query active calls from Stream

        let cancelled = false

        const fetchActiveCall = async() => {            // must create a callback function, 
                                                        // because can't process async code within useEffect otherwise
            try {
                const {calls} = await client.queryCalls(
                    {
                        filter_conditions: {
                            members: {$in: [userId]},
                            ongoing: true
                        },
                        sort: [{
                            field: 'created_at',
                            direction: -1,
                        }],
                        limit: 1,
                        watch: true
                    }
                )
                
                if (!cancelled) {
                    setActiveCall(calls[0] ?? null)
                    setIsLoading(false)
                }

            } catch(err) {
                console.log('Failed to query active call: ', err)
                if (!cancelled) setIsLoading(false)
            }
        }

        fetchActiveCall()

        return () => {
            cancelled = true                    // 'cancelled' prevents state updates after unmount (aka updates to activeCall, isLoading etc)
        }

    }, [client, userId])                            // dependecies ensure fetch process starts once client and userId loads

    return {activeCall, isLoading}
}

export default useActiveCalls