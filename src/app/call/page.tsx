'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Call() {
  const [isCallActive, setIsCallActive] = useState(false)

  const handleToggleCall = () => {
    setIsCallActive(!isCallActive)
    // TODO: Implement call logic
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">MTN Customer Support Call</h1>
      <Button onClick={handleToggleCall} className={isCallActive ? 'bg-red-500 hover:bg-red-600' : ''}>
        {isCallActive ? 'End Call' : 'Start Call'}
      </Button>
      {isCallActive && (
        <p className="mt-4">Call is active. Speak with our AI agent.</p>
      )}
    </div>
  )
}