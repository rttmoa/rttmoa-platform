import React from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../actions/actions'; // TODO: actions = export default *


 
const App = () => {
  const dispatch = useDispatch();
  const count = useSelector(createSelector(store => store.count, state => state));

  return (
    <div>
      <h1>The count is {count}</h1>
      <button onClick={() => dispatch(actions.increment(count))}>+</button>
      <button onClick={() => dispatch(actions.decrement(count))}>-</button>
    </div>
  );
}

export default App;
