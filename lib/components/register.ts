// Register custom elements.

import { onekey } from './name.js';

import { OneKey } from './one-key.js';

/**
 * Register custom elements defined by this module.
 */
export function register(): void {
    customElements.define(onekey, OneKey);
}
