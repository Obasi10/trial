import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error1, setError1] = useState(null)
  const [isLoading1, setIsLoading1] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const { dispatch } = useAuthContext()

  const signup = async (name, description, email, password, review, reviewStar, reviewTitle, queryName, queryEmail, queryType, query, suscribe) => {
    setIsLoading1(true)
    setError1(null)

    try{
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, description, email, password, review, reviewStar, reviewTitle, queryName, queryEmail, queryType, query, suscribe})
      })
      const json = await response.json()
  
      if (!response.ok) {
        setIsLoading1(false)
        throw new Error(json.error)
        setEmptyFields(json.emptyFields)
      }
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
        setError1(null)
        setEmptyFields([])

        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
  
        // update loading state
        setIsLoading1(false)
      }
    } catch(err) {
      setIsLoading1(false)
      if(err.message[0]==="U"){
        setError1("Network problem! check your connection and try again.")
      } else {setError1(err.message)}
    }
  }

  return { signup, isLoading1, error1}
}