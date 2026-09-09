'use server'

import { currentUser} from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
    const user = await currentUser()
    
    // 1: ensuring we have user, api key and api secret
    if (!user) throw Error('User is not loggen in')
    if (!apiKey) throw Error('No API key')
    if (!apiSecret) throw Error('No API secret')

    // 2: creating the client, expiry and issued times
    const client = new StreamClient(apiKey, apiSecret)
    const expiry = Math.round(new Date().getTime() / 1000) + 60*60 // important : even if sb steals token, it's only valid for 1 hr (3600s)
    const issued = Math.floor(Date.now() / 1000) - 60

    // 3: generating the token
    const token = client.generateUserToken({
        user_id: user.id, 
        exp: expiry, 
        iat: issued
    })

    return token
}
