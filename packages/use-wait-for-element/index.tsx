import { useEffect, DependencyList } from '../use-observer/node_modules/@types/react';

type Selector = Parameters<ParentNode['querySelector']>[0];

/**
 * Run callback when element is visible on the dom
 * @param {Selector} selector - HTML selector to find dom element.
 * @param {function} callback - Function that is called when node appears on the dom.
 * @param {DependencyList} dependencies - Cache key.
 */
export const useWaitForElement = (
    selector: Selector,
    callback: (element: Element) => void,
    dependencies: DependencyList = []
) => {
    useEffect(() => {
        if (document.querySelector(selector)) return callback(document.querySelector(selector)!);
            
        const observer = new MutationObserver(mutations => {
            if (!document.querySelector(selector)) return;
        
            callback(document.querySelector(selector)!);
            observer.disconnect();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, dependencies);
}
