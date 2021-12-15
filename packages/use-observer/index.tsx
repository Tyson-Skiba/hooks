import { useCallback, useEffect, useRef } from 'react';

interface ObserverAction {
    once?: boolean;
    action: (element: Element) => void;
}
   
/**
 * Register callback to be run when element is visible on the dom
 * @param {boolean} cleanup - Optionally remove the observer when componenent is unmounted.
 */
export const useObserver = (cleanup?: boolean) => {
    const observerMap = useRef<Record<string, ObserverAction>>({});
    const observer = useRef<MutationObserver>(new MutationObserver(mutations => {
        const selectors = Object.keys(observerMap.current);

        selectors.forEach(selector => {
            if (!document.querySelector(selector)) return;
    
            const { once, action } = observerMap.current[selector];
            action(document.querySelector(selector)!);
            if (once) delete observerMap.current[selector];
        });
    }));
   
    const watchFactory = (once: boolean) => (selector: string, callback: (element: Element) => void) => {
        if (document.querySelector(selector)) callback(document.querySelector(selector)!);
        else {
            observerMap.current[selector] = { once, action: callback };
        }
    };
 
    useEffect(() => {
        observer.current.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => cleanup ? observer.current.disconnect() : undefined;
    }, []);
 
    return {
        once: useCallback(watchFactory(true), [observer]),
        watch: useCallback(watchFactory(false), [observer]),
        clear: (selector: string) => delete observerMap.current[selector],
        observer: observer.current,
    };
};
