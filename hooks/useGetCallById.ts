import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useState, useEffect } from "react"

export const useGetCallById = (id:string) => {
    const [call, setCall] = useState<Call>()
    const [isCallLoading, setIsCallLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    // fetching the current client
    const client = useStreamVideoClient()

    useEffect( () => {
        if (!client) return

        // reset states when ID changes
        setIsCallLoading(true)
        setError(null)

        const fetchCall = async() => {
            try { 
                const callRef = client.call('default', id) 
                await callRef.get() // verifies call exists or throws an error
                setCall(callRef) // sets call to verified reference

            } catch(error) {
                setError(error as Error)
                setCall(undefined)

            } finally {
                setIsCallLoading(false)
            }
        }

        fetchCall()

    }, [client, id])

    return call
}