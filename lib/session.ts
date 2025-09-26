import type { User } from './auth'

const SESSION_KEY = 'vital-user-session'

export const sessionManager = {
  // Save user session
  saveSession: (user: User) => {
    if (typeof window !== 'undefined') {
      try {
        const sessionData = {
          user,
          timestamp: Date.now(),
          expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
        sessionStorage.setItem('vital-active', 'true')
      } catch (error) {
        console.error('Failed to save session:', error)
      }
    }
  },

  // Get current session
  getSession: (): User | null => {
    if (typeof window !== 'undefined') {
      try {
        const sessionData = localStorage.getItem(SESSION_KEY)
        if (!sessionData) return null

        const parsed = JSON.parse(sessionData)
        
        // Check if session is expired
        if (Date.now() > parsed.expiresAt) {
          sessionManager.clearSession()
          return null
        }

        return parsed.user
      } catch (error) {
        console.error('Failed to get session:', error)
        return null
      }
    }
    return null
  },

  // Clear session
  clearSession: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(SESSION_KEY)
        localStorage.removeItem('vital-user')
        sessionStorage.removeItem('vital-user')
        sessionStorage.removeItem('vital-active')
        
        // Clear any other app-specific storage
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.startsWith('vital-')) {
            localStorage.removeItem(key)
          }
        })
      } catch (error) {
        console.error('Failed to clear session:', error)
      }
    }
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return sessionManager.getSession() !== null
  },

  // Extend session
  extendSession: () => {
    const session = sessionManager.getSession()
    if (session) {
      sessionManager.saveSession(session)
    }
  }
}

// Auto-extend session on user activity
if (typeof window !== 'undefined') {
  const extendOnActivity = () => {
    if (sessionManager.isLoggedIn()) {
      sessionManager.extendSession()
    }
  }

  // Extend session on user interactions
  window.addEventListener('click', extendOnActivity)
  window.addEventListener('keypress', extendOnActivity)
  window.addEventListener('scroll', extendOnActivity)
}
