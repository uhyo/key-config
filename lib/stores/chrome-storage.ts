import { IKey } from '../key.js';
import { IKeyConfigStore } from '../spec.js';

/**
 * Store using chrome.storage.sync
 */
export class ChromeStorageStore implements IKeyConfigStore {
    /**
     * Prefix of storage key.
     */
    private prefix: string;
    constructor(prefix: string) {
        this.prefix = prefix;
    }
    public get(keyids: string[]): Promise<Record<string, IKey | undefined>> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keyids, result => {
                if (result == null) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }
    public set(keyid: string, key: IKey): Promise<void> {
        return new Promise(resolve => {
            chrome.storage.sync.set({ [keyid]: key }, resolve);
        });
    }
    public listen(
        callback: ((keyid: string, key: IKey | null) => void),
    ): (() => void) {
        const storageHandler = (
            changes: Record<string, any>,
            areaName: string,
        ) => {
            if (areaName !== 'sync') {
                return;
            }
            for (const keyid of Object.keys(changes)) {
                const change = changes[keyid];
                const key = change.newValue || null;
                callback(keyid, key);
            }
        };
        chrome.storage.onChanged.addListener(storageHandler);
        const unlisten = () =>
            chrome.storage.onChanged.removeListener(storageHandler);
        return unlisten;
    }
}
