import { addKeyDefault, IKey } from './key.js';
import { IKeyConfigStore, KeyConfigSpec } from './spec.js';

/**
 * Load key settings from given store using given spec.
 */
export function loadKeySettings(
    store: IKeyConfigStore,
    spec: KeyConfigSpec,
): Promise<Record<string, IKey>> {
    const keyids = spec.map(({ id }) => id);
    return store.get(keyids).then(result => {
        const keys: any = {};
        for (const { id, default: df } of spec) {
            const k = result[id] || addKeyDefault(df || {});
            keys[id] = k;
        }
        return keys;
    });
}
