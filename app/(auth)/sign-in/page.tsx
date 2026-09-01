'use client'

import { SignIn } from '@clerk/react'

const SignInPage = () => {
  return (
    <div className='flex items-center justify-center h-screen font-medium text-2xl'>
        <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"

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

export default SignInPage