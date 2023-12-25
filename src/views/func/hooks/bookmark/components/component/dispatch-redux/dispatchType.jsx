/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value })  => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      {/* TODO: dispatch类型：可直接在reducers中处理 */}
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
