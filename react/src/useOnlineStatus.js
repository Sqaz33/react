import { useEffect, useState } from "react";

export default function useOnlineStatus() {
	const [isOnline, setIsOnline] = useState(navigator.onLine)

	useEffect(() => {
    function handleOffline() {
      setIsOnline(false)
    }

    function handleOnline() {
      setIsOnline(true)
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
	}, [])

	return isOnline
}