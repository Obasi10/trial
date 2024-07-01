import { useEffect, useState } from 'react'
import React from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [errora, setError]=useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setdon]=useState(false)
  const {dispatch}=useAuthContext()

  const login = async (email, password) => {
    setError(null)
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json= await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      // update loading state
      setdon(true)
      setIsLoading(false)
      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
    }
  }
  return { login, isLoading, errora, done}
}