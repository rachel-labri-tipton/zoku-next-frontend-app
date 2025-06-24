'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// Ensure getTheme is correctly imported from your theme utility file
import { useTheme } from 'next-themes'
import { getTheme } from '@/materialui'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false) // Changed from true to false
  const { theme, resolvedTheme } = useTheme() // Added resolvedTheme

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Use resolvedTheme instead of theme for more reliable dark/light detection
  const muiTheme = getTheme(resolvedTheme === 'dark' ? 'dark' : 'light')

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </NextThemeProvider>
  )
}