import { useConnectedUser, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useState } from "react"
import toast from "react-hot-toast"

export const useScheduleMeeting = () => {
    const client = useStreamVideoClient()                   // client loads before user attaches
    const user = useConnectedUser()
    const userId = user?.id

    // TEST
    console.log(client, userId)

    const [isOpen, setIsOpen] = useState(false)             // modal open or closed state
    const [description, setDescription] = useState('')      // description for meeting
    const [dateTime, setDateTime] = useState('')            // date and time for meeting :  ISO string from <input type="datetime-local" />
    const [isLoading, setIsLoading] = useState(false)
    
    const scheduleMeeting = async() => {
        if (!client || !userId || !dateTime) return

        setIsLoading(true)

        try {   
            const callId = crypto.randomUUID()              // creating a random ID
            const call = client.call('default', callId)     // create a call instance

            await call.getOrCreate({                        // persists the call on Stream servers
                data : {
                    starts_at: new Date(dateTime).toISOString(),
                    custom: {description},
                    members: [{user_id: userId}]            // how will we add more members ?
                }
            })

            // SUCCESS TOAST
            toast.success('Successfully scheduled meeting!')

            // RESET THE FORM
            setDateTime('')
            setDescription('')
            setIsOpen(false)
        } catch(err) {
            console.log('Failed to schedule meeting :', err)
            // ERROR TOAST
            toast.success('Failed to schedule meeting. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }
    
    return {
        isOpen, setIsOpen,
        description, setDescription,
        dateTime, setDateTime,
        isLoading,
        scheduleMeeting
    }
}