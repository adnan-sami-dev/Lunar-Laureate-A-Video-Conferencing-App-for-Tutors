// Purpose : allow us to do specific things to all pages
// within the "root" route group
// This is entry point layout for entire app
// wraps every page - anything put here appears on all pages (eg. NavBar, Footer)

import { ReactNode } from "react"

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default RootLayout