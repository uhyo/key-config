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
}
