import { useEffect } from "react";

function useEffectOnce(cb: any) {
  useEffect(cb, []);
}

export default function UseEffectOnce() {
  useEffectOnce(() => console.log("Hi"));

  return <div>UseEffectOnce</div>;
}
