// Register custom elements.

import { onekey } from './name';

import { OneKey } from './one-key';

/**
 * Register custom elements defined by this module.
 */
export function register(): void {
    customElements.define(onekey, OneKey);
}
