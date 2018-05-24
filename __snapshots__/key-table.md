# `key-table`

#### `Initial content of KeyConfigTable is empty`

```
"
            <table class=\"table\">
            </table>
        "
```

#### `setSpec() rerenders content`

```
"
            <table class=\"table\">
            <tbody><tr><td>Foo shortcut</td><td><kc-one keyid=\"foo\" label=\"Label\"></kc-one></td></tr><tr><td>ばあああああ</td><td><kc-one keyid=\"bar\" label=\"Label\"></kc-one></td></tr></tbody></table>
        "
```

#### `properly update label`

```
"
            <table class=\"table\">
            <tbody><tr><td>Foo shortcut</td><td><kc-one keyid=\"foo\" label=\"New Label!\"></kc-one></td></tr><tr><td>ばあああああ</td><td><kc-one keyid=\"bar\" label=\"New Label!\"></kc-one></td></tr></tbody></table>
        "
```

#### `second setSpec() replaces content`

```
"
            <table class=\"table\">
            <tbody><tr><td>BazBazBaz</td><td><kc-one keyid=\"baz\" label=\"Label\"></kc-one></td></tr><tr><td>piyo</td><td><kc-one keyid=\"hoge\" label=\"Label\"></kc-one></td></tr></tbody></table>
        "
```

#### `setSpec() success when label is not set`

```
"
            <table class=\"table\">
            <tbody><tr><td>Foo shortcut</td><td><kc-one keyid=\"foo\" label=\"\"></kc-one></td></tr><tr><td>ばあああああ</td><td><kc-one keyid=\"bar\" label=\"\"></kc-one></td></tr></tbody></table>
        "
```

