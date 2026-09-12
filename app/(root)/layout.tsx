// Purpose : allow us to do specific things to all pages
// within the "root" route group
// This is entry point layout for entire app
// wraps every page - anything put here appears on all pages (eg. NavBar, Footer)

import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server";
import StreamVideoProvider from "../../providers/StreamClientProvider";

export default async function RootLayout ({children}: {children: ReactNode}) {

  const clerkAuth = await auth()
  // If no active session/user, redirect to sign-in
  if (!clerkAuth.userId) redirect('/sign-in')

  return (
    <main>
      {/* wrapping the app with access to the shared stream video client */}
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}