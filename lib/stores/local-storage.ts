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
    public listen(
        callback: ((keyid: string, key: IKey | null) => void),
    ): (() => void) {
        const storageHandler = (e: StorageEvent) => {
            if (e.key != null && e.key.startsWith(`${this.prefix}-`)) {
                // Retrieve the keyid to which a change is made.
                const keyid = e.key.slice(this.prefix.length + 1);
                try {
                    const key: IKey | null =
                        e.newValue != null ? JSON.parse(e.newValue) : null;
                    callback(keyid, key);
                } catch (e) {
                    console.error(e);
                }
            }
        };
        window.addEventListener('storage', storageHandler, false);
        const unlisten = () =>
            window.removeEventListener('storage', storageHandler, false);
        return unlisten;
    }
    private prefixedKey(key: string): string {
        return `${this.prefix}-${key}`;
    }
}
