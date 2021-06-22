import { useState, useCallback } from 'react'
export const myFunc = () => true

export const useCounter = () => {
    const [count, setCount] = useState(0)
    const increment = useCallback(() => setCount((x) => x + 1), [])
    return { count, increment }
}