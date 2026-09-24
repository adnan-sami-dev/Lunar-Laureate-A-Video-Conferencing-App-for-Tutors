
import { Call } from "@stream-io/video-react-sdk"
import { useState } from "react"

const useActiveCalls = () => {
    const [activeCall, setActiveCall] = useState<Call | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    

    return {activeCall, isLoading}
}

export default useActiveCalls