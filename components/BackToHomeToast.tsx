import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type BackToHomeToastProps = {
  open: boolean
  message?: string
}

const BackToHomeToast = ({ open, message = 'Call left' }: BackToHomeToastProps) => {
  const router = useRouter()

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => router.push('/'), 3000)
    return () => clearTimeout(timer)
  }, [open, router])

  if (!open) return null

  return (
    <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2">
      <div className="flex flex-col items-center gap-1 rounded-2xl border-2
                      border-primary-text bg-gray-800 px-5 py-3 text-white shadow-lg">
        <span className="text-lg font-medium">{message}</span>
        <span className="text-sm text-gray-400">Redirecting to home…</span>
      </div>
    </div>
  )
}

export default BackToHomeToast