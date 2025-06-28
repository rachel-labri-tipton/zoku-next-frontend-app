'use client'

import { useEffect, useState } from 'react'

const Greeting = () => {
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      setUsername(userData.name || 'User')
    }
  }, [])

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="text-2xl font-raleway font-bold mb-6">
      {getTimeBasedGreeting()}, {username}
    </div>
  )
}

export default Greeting