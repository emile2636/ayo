import { useEffect, useState } from 'react'
import { isCounterValueValidate } from '../utils/index'

export default function useCounter(value = 0, min = 0, max = 999, step = 1) {
  const isValidate = isCounterValueValidate(value, min, max)
  const [count, setCount] = useState(isValidate ? value : min)

  const plus = () =>
    setCount((x) => {
      const value = Number(x) + step
      const isValidate = isCounterValueValidate(value, min, max)
      if (isValidate) return value
      return Number(x)
    })

  const minus = () =>
    setCount((x) => {
      const value = Number(x) - step
      const isValidate = isCounterValueValidate(value, min, max)
      if (isValidate) return value
      return Number(x)
    })

  const publicSetCount = (value) => {
    // can do some logic here
    const isValidate = isCounterValueValidate(Number(value), min, max)
    if (isValidate) setCount(Number(value))
  }

  return [count, publicSetCount, plus, minus]
}
