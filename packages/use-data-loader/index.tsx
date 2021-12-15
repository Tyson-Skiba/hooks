import hash from 'object-hash';
import { useCallback, useRef, useState } from 'react';

interface DataLoaderState<T> {
    error?: Error;
    currentData: T;
    isLoading: boolean;
  }
   
interface DataLoaderOptions<TReturn, TArgs extends unknown[] = []> {
    toCacheKey?: (...args: TArgs) => string;
    defaultDataValue?: TReturn;
    disableCache?: boolean;
}
   
type DataLoaderReturn<TReturn, TArgs extends unknown[] = []>= [(...args: TArgs) => void, DataLoaderState<TReturn>];

const isAsync = <T extends any>(method: T | Promise<T>): method is Promise<T> => !!(method as Promise<T>).then;
// const defaultCacheKeyGen = () => Math.random().toString(36).slice(2);
   
export const useDataLoader = <TReturn, TArgs extends unknown[] = []>(
    loader: (...args: TArgs) => Promise<TReturn>,
    opts?: DataLoaderOptions<TReturn, TArgs>,
): DataLoaderReturn<TReturn, TArgs> => {
    const [isLoading, setLoading] = useState(false);
    const [error, setDidError] = useState<Error>();
    const [currentData, setData] = useState<TReturn>(opts?.defaultDataValue as TReturn);
   
    const cache = useRef<Record<string, TReturn>>({});
    const queue = useRef<Record<string, boolean>>({});
   
    const read = useCallback(async (...args: TArgs) => {
        const cacheKeyGen = opts?.toCacheKey ?? hash;
        const cacheKey = cacheKeyGen(args);
    
        if (queue.current[cacheKey]) return;
        queue.current[cacheKey] = true;
 
        if (opts?.disableCache || cache.current[cacheKey] === undefined) {
            // setLoading(true);
            try {
                const data = await loader(...args);
                cache.current[cacheKey] = data;
        
                setData(data);
                setLoading(false);
            } catch (err) {
                setDidError(err as Error);
                setLoading(false);
            }
        } else {
            setData(cache.current[cacheKey]);
            setLoading(false);
        }
    }, [loader]);
   
    return [read, {
        error,
        currentData,
        isLoading,
    }];
};
   