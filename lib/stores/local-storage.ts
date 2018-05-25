import { IKey } from '../key.js';
import { IKeyConfigStore } from '../spec.js';
/**
 * Store using localStoarge.
 */
export class LocalStorageStore implements IKeyConfigStore {
    /**
     * Prefix of localStorage key.
     */
    private prefix: string;
    constructor(prefix: string) {
        this.prefix = prefix;
    }
    public get(keyids: string[]): Promise<Record<string, IKey | undefined>> {
        const result: Record<string, IKey | undefined> = {};
        for (const key of keyids) {
            const v = localStorage.getItem(this.prefixedKey(key));
            if (v != null) {
                result[key] = JSON.parse(v);
            }
        }
        return Promise.resolve(result);
    }
    public set(keyid: string, key: IKey): Promise<void> {
        localStorage.setItem(this.prefixedKey(keyid), JSON.stringify(key));
        return Promise.resolve();
    }
    private prefixedKey(key: string): string {
        return `${this.prefix}-${key}`;
    }
}
