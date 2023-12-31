import React, { useEffect, useRef } from "react";

export default function useIsMount() {
  const isMountRef = useRef<boolean>(true);

  useEffect(() => {
    isMountRef.current = false;
  }, []);

  return isMountRef.current;
}
