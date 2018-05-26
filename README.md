# key-config [![NPM version][npm-image]][npm-url]
> A UI written with Web Components for key config.

## Installation

```sh
$ npm install key-config
```

## Usage

### Use the key config component
In your HTML:

```html
<kc-keyconfig label="Press a new shortcut key."></kc-keyconfig>
```

Then initialize the component:

```js
import {
  register,
  LocalStorageStore,
  ChromeStorageStore,
} from 'key-config';

// Register the custom elements defined by key-config.
register();

// Initialize a store to save key config.
const store = new LocalStorageStore('prefix');
// const store = new ChromeStorageStore('prefix');

// Define keyboard shortcuts.
const spec = [
  {
    id: 'save',
    name: 'Save to File',
    // Default config (optional; no shortcut if not specified)
    default: {
      key: 'S',
      shiftKey: false,
      ctrlKey: true,
      altKey: false,
      metaKey: false,
    },
  },
  {
    id: 'quit',
    name: 'Quit',
    default: {
      key: 'Q',
      shiftKey: false,
      ctrlKey: true,
      altKey: false,
      metaKey: false,
    },
  },
];

const kc = document.querySelector('kc-keyconfig');

kc.connect(store, spec);
```
## License

MIT © [uhyo]()


[npm-image]: https://badge.fury.io/js/key-config.svg
[npm-url]: https://npmjs.org/package/key-config
