'use client'

import { useState, useEffect } from 'react'
import { Clock, Users, Flame } from 'lucide-react'

interface ProductUrgencyProps {
  inventoryQuantity?: number | null
  isLowStock?: boolean
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function ProductUrgency({ inventoryQuantity, isLowStock }: ProductUrgencyProps) {
  // Countdown: set to end of next 6-hour window
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const getTarget = () => {
      const now = new Date()
      // Next 6-hour block (00:00, 06:00, 12:00, 18:00)
      const blockHours = [0, 6, 12, 18, 24]
      const currentHour = now.getHours()
      const nextBlock = blockHours.find((h) => h > currentHour) ?? 24
      const target = new Date(now)
      target.setHours(nextBlock, 0, 0, 0)
      return target.getTime()
    }

    const target = getTarget()

    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }
      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ hours, minutes, seconds })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="space-y-3">
      {/* Sale Countdown */}
      <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-red-500 flex-shrink-0" />
          <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Flash Sale Ends In</span>
        </div>
        <div className="flex items-center gap-1 font-mono text-sm font-bold text-red-700">
          <span className="bg-red-600 text-white rounded px-1.5 py-0.5">{pad(timeLeft.hours)}</span>
          <span className="text-red-400">:</span>
          <span className="bg-red-600 text-white rounded px-1.5 py-0.5">{pad(timeLeft.minutes)}</span>
          <span className="text-red-400">:</span>
          <span className="bg-red-600 text-white rounded px-1.5 py-0.5">{pad(timeLeft.seconds)}</span>
        </div>
      </div>

      {/* Low Stock or Active Viewers */}
      <div className="flex items-center gap-4">
        {isLowStock && inventoryQuantity != null && inventoryQuantity > 0 ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>
            <span className="text-xs font-semibold text-orange-700">
              Only {inventoryQuantity} left in stock
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-xs font-semibold text-green-700">In Stock — Ships Today</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>47 people viewing this right now</span>
        </div>
      </div>
    </div>
  )
}
