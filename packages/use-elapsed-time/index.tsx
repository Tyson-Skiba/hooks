import { useEffect, useState } from 'react';

/**
 * Get time since mount
 * @returns {number} time since first mount.
 */
export const useElapsedTime = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
  
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.1)
        }, 100);

        return () => clearInterval(interval);
    }, []);
  
    return elapsedTime;
}
