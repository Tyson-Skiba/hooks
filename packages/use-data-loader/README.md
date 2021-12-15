# @hookers/use-data-loader

__requires react 16.8+__

Wait for a dom element to appear then execute a callback

## install

```shell
yarn add @hookers/use-data-loader
```

```jsx
import { useDataLoader } from '@hookers/use-data-loader';

export const Example: React.FC = () => {
    const dataLoader = async (searchTerm: string) => {
        const data = await ExternalApiCall(searchTerm);
        return proccessData(data);
    } 

    const [read, { error, currentData, isLoading }] = useDataLoader(dataLoader);
    
    return (
        <>
            <input type="text" placeholder="search..." onBlur={evt => read(evt.target.value)} />
            { isLoading ? <div>Loading</div> : null }
            { error ? <div>Error</div> : null }
            { data ? <div>{ data }</div> : null }
        </>
    );
}
```
