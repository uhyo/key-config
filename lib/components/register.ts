// Register custom elements.

import { keyconfig, keytable, onekey } from './name.js';

import { KeyConfig } from './key-config.js';
import { KeyConfigTable } from './key-table.js';
import { OneKey } from './one-key.js';

/**
 * Flag which indicates register is already called.
 */
let registered = false;

/**
 * Register custom elements defined by this module.
 */
export function register(): void {
    if (registered) {
        return;
    }
    customElements.define(onekey, OneKey);
    customElements.define(keytable, KeyConfigTable);
    customElements.define(keyconfig, KeyConfig);

    registered = true;
}
