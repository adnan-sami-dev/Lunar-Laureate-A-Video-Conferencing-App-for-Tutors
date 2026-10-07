
import {useEffect, useState} from 'react'
import { useStreamVideoClient, useConnectedUser, Call } from '@stream-io/video-react-sdk'

export const usePreviousMeetings = () => {
    // GET THE STREAM VIDEO CLIENT AND THE USER
    const client = useStreamVideoClient()
    const user = useConnectedUser()

    const [calls, setCalls] = useState<Call[]>([])      // array for storing list of calls
    const [isLoading, setIsLoading] = useState(true)

    const [refreshKey, setRefreshKey] = useState(0)

    // GET THE USER ID  
    const userId = user?.id

    useEffect (() => {
        if (!client || !userId) return

        let cancelled = false

        const fetchCalls = async() => {
            
            try {
                // CALL FILTER
                const {calls: result} = await client.queryCalls({
                    filter_conditions: {
                        $or: [
                            { created_by_user_id: userId},
                            { members: {$in: [userId]}}
                        ],
                        starts_at: { $lt: new Date().toISOString()},
                    },            
                    sort: [{field: 'starts_at', direction: 1}],
                    watch: true,
                })

                const filteredCalls = result.filter(
                    (call) => !call.state.custom?.[`hidden_${userId}`]
                )

                if (!cancelled) setCalls(filteredCalls)
            } catch(err) {
                console.log('Failed to query upcoming calls:', err)
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        fetchCalls()

        return () => {cancelled = true}
    }, [client, userId, refreshKey])

    const refetch = () => setRefreshKey(k => k + 1)

    return {calls, isLoading, refetch}
}