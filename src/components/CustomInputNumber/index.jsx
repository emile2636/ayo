import { useEffect, useRef, useState } from 'react'
import useCounter from '../../hooks/useCounter'
import { useInterval } from '../../hooks/useInterval'
import { useDebounce } from '../../hooks/useDebounce'
import './index.scss'

const styles =
  'basis-[48px] h-[48px] border border-sky-300 rounded flex justify-center items-center text-white font-bold'

function CustomInputNumber({
  min = 0,
  max = 999,
  value = 0,
  step = 1,
  name = 'custom-input-number',
  onChange = () => {},
  onBlur = () => {},
  disabled = true,
}) {
  // extract counter logic
  const [count, setCount, plus, minus] = useCounter(value, min, max, step)
  // debounce press event
  const debouncedCount = useDebounce(count)

  // flag trigger interval
  const [plusing, setPlusing] = useState(false)
  const [minusing, setMinusing] = useState(false)
  useInterval(plus, plusing ? 100 : null)
  useInterval(minus, minusing ? 100 : null)

  useEffect(() => {
    // trigger change in side effect insure right count
    onChange(name, count)
  }, [debouncedCount])

  const onInputChange = (e) => {
    const v = e.target.value
    const n = e.target.name
    setCount(v)
  }

  const onInputBlur = (e) => {
    onBlur(name, count)
  }

  // plus event
  const onPlusMouseDown = () => {
    if (disabled) return
    setPlusing(true)
  }

  const onPlusMouseUp = () => {
    if (disabled) return
    setPlusing(false)
  }

  const onPlusClick = () => {
    if (disabled) return
    plus()
  }

  // minus event
  const onMinusMouseDown = () => {
    if (disabled) return
    setMinusing(true)
  }

  const onMinusMouseUp = () => {
    if (disabled) return
    setMinusing(false)
  }

  const onMinusClick = () => {
    if (disabled) return
    minus()
  }

  return (
    <div className='flex items-center space-x-[8px] w-[160px]'>
      <div
        className={`item-minus ${styles} cursor-pointer hover:bg-sky-700`}
        onMouseDown={onMinusMouseDown}
        onMouseUp={onMinusMouseUp}
        onClick={onMinusClick}
      >
        -
      </div>
      <div className={`item-input ${styles}`}>
        <input
          name={name}
          type='number'
          className='w-[48px] h-[48px] rounded text-center m-0 text-sky-500'
          value={count}
          onChange={onInputChange}
          onBlur={onInputBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </div>
      <div
        className={`item-plus ${styles} cursor-pointer hover:bg-sky-700`}
        onMouseDown={onPlusMouseDown}
        onMouseUp={onPlusMouseUp}
        onClick={onPlusClick}
      >
        +
      </div>
    </div>
  )
}

export default CustomInputNumber
