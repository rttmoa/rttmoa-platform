/* eslint-disable react/display-name */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateTel, updateName } from './action'  // TODO: action中引入module



// 有的没有在全局引入所有action，可以单独引入不同action并派发
export default () => {
  const formData = useSelector(state => state)
  const dispatch = useDispatch()
  console.log(formData);

  return <div>
      form: <br/>
      姓名: <input type="text" onChange={(e) => {
        dispatch(updateName(e.target.value))
      }}/>
      电话: <input type="tel" onChange={(e) => {
        dispatch(updateTel(e.target.value))
      }}/>
  </div>

}
