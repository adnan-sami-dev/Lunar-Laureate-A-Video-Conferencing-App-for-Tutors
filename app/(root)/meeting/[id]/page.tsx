'use client'

import { useParams } from 'next/navigation'

const MeetingPage = () => {
  const {id} = useParams()


  return (
    <main>
      <div>
        Meeting ID : {id}
      </div>
    </main>
  )
}

export default MeetingPage