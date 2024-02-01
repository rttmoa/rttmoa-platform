import { useRef, useEffect } from "react";

const useEventListener = (eventName: string, handler: Function) => {
  const eventRef = useRef<any>();

  useEffect(() => {
    eventRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const isClient = !!(typeof window !== "undefined" && window.document && window.document.createElement);
    if (!isClient) return;
    if (!window.addEventListener) return;
    const eventListener = (event: any) => eventRef.current(event);
    window.addEventListener(eventName, eventListener);
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};
export default useEventListener;
