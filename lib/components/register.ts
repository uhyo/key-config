// Register custom elements.

import { keytable, onekey } from './name.js';

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

    registered = true;
}
