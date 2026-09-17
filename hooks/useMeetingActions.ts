'use client'

/*
    get shared client
    create a unique call ID
    create a local reference to the call
    get or create the call using Stream's servers
    redirect user to the meeting page
    return the function with all this ability
*/

import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"

export const useMeetingActions = () => {

    const client = useStreamVideoClient() // access to shared client object
    const router = useRouter() // for switching route to meeting page

    const createMeeting = async () => {
        if (!client) return

        try {
            const callID = crypto.randomUUID()

            const call = client.call('default', callID)
            if (!call) throw new Error('Failed to Create Meeting!')

            await call.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                    custom: {
                        description: "Instant Meeting"
                    }
                }
            })

            router.push(`/meeting/${call.id}`)

        } catch(error) {
            console.error('Error creating meeting:', error)
        }
    }

    return {createMeeting}
}