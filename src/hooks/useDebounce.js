import { useState, useEffect } from 'react'

export const useDebounce = (value, delay = 100) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)

    return () => {
      clearTimeout(id)
    }
  }, [value, delay])

  return debounced
}
