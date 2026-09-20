'use client'

import { tokenProvider } from "@/actions/stream.actions"
import { useUser } from "@clerk/react"
import { StreamCall, StreamVideo, StreamVideoClient, User  } from "@stream-io/video-react-sdk"
import { ReactNode, useState, useEffect } from "react"
import Loader from "@/components/Loader"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

const StreamVideoProvider = ({children} : {children : ReactNode}) => {

    // Getting user from clerk
    const {user, isLoaded} = useUser() 

    // creating default state for the Stream Video Client
    const [videoClient, setVideoClient] = useState<StreamVideoClient>()

    // on first load and subsequent loads upon user state changes, check presence of any user 
    // and whether valid api key exists
    // if all is good, it creates a "client-side" video client
    useEffect(() => {
        if (!user || !isLoaded) return;
        if (!apiKey) throw new Error('Stream API Key missing');

        const client = StreamVideoClient.getOrCreateInstance({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.firstName || 'Anonymous User',
                image: user?.imageUrl,
            },
            tokenProvider: tokenProvider
        })

        setVideoClient(client)

    }, [user, isLoaded])

    if (!videoClient) return <Loader />

    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    )
}

export default StreamVideoProvider

