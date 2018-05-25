# `key-config`

#### `key-config renders key-table`

```
"<kc-table label=\"Label!\"></kc-table>"
```

#### `loads each key config from store`

```
Array [
  "get foo,bar",
]
```

#### `writes to store when key-change event is fired`

```
Array [
  "get foo,bar",
  "set foo {\"altKey\":false,\"ctrlKey\":false,\"key\":\"Z\",\"metaKey\":false,\"shiftKey\":true}",
]
```

#### `Nothing happens when not connected but key-change is fired`

```
Array []
```

