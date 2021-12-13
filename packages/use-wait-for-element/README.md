# @hookers/use-wait-for-element

__requires react 16.8+__

Wait for a dom element to appear then execute a callback

## install

```shell
yarn add @hookers/use-wait-for-element
```

```jsx
import { useWaitForElement } from '@hookers/use-wait-for-element';

const onClick = () => {
    const demo = document.createElement('div');
    demo.id = 'demoId';
    document.body.appendChild(demo);
}

export const Example: React.FC = () => {
    useWaitForElement('#demoId', () => aleart('callback!'));
    
    return <button onClick={onClick}>Click me</button>;
}
```
