'use client'

import { SignUp } from '@clerk/react'


const page = () => {
  return (
    <div className='flex items-center justify-center h-screen font-medium text-2xl'>
        <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"

            // Optional: customize appearance
            appearance={{
                elements: {
                    formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
                    card: 'shadow-lg',
                },
            }}
        />
    </div>
  )
}

export default page