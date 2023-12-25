import React, { useCallback, useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount(count => count + 1);
  }, []);
  const decrement = useCallback(() => {
    setCount(count => count - 1);
  }, []);
  const reset = useCallback(() => {
    return setCount(0);
  }, []);
  return {
    count,
    increment,
    decrement,
    reset
  };
}
function Index() {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <div>
      <button onClick={increment}>+</button>
      <p>{count}</p>
      <button onClick={decrement}>-</button>
      <p></p>
      <button onClick={reset}>reset</button>
    </div>
  );
}
export default Index;
