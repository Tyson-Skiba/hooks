# @hookers/use-observer

__requires react 16.8+__

Wait for a dom element to appear then execute a callback

## install

```shell
yarn add @hookers/use-observer
```

Simple demo

```jsx
import { useObserver } from '@hookers/use-observer';

const onClick = () => {
    const demo = document.createElement('div');
    demo.id = 'demoId';
    document.body.appendChild(demo);
}

export const Example: React.FC = () => {
    const { once } = useObserver();

    React.useEffect(() => {
        once('#demoId', () => alert('callback!'));
    }, []);
    
    return <button onClick={onClick}>Click me</button>;
}
```

Simple demo with clear

```jsx
import { useObserver } from '@hookers/use-observer';

const onClick = () => {
    const demo = document.createElement('div');
    demo.id = 'demoId';
    document.body.appendChild(demo);
}

export const Example: React.FC = () => {
    const { clear, watch } = useObserver();

    React.useEffect(() => {
        watch('#demoId', () => alert('callback!'));
    }, []);
    
    return (
        <>
            <button onClick={onClick}>Click me</button>
            <button onClick={() => clear('#demoId')}>Clear</button>
        </>
    );
}
```
