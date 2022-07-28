import { useEffect, useState } from "react";

export default function useAutoClearMessage(timeout, initState) {
  const [message, setMessage] = useState(initState);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [message, timeout]);

  return [message, setMessage];
}
