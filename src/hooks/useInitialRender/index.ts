import React, { useEffect } from "react";

export default function useInitialRender() {
  const ref = React.useRef<any>(null);
  useEffect(() => {
    ref.current = true;
  }, []);
  return ref.current;
}
