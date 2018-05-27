import { addKeyDefault, getKeyDestructive, IKey, keyEqual } from './key.js';
import { loadKeySettings } from './load.js';
import { IKeyConfigStore, KeyConfigSpec } from './spec.js';

/**
 * Object which listens 'keydown' event
 */
export class KeyListener extends EventTarget {
    private keys: Record<string, IKey> = {};
    private unlistenFunction: (() => void) | null = null;
    private keyDest: IKey = {
        altKey: false,
        ctrlKey: false,
        key: '',
        metaKey: false,
        shiftKey: false,
    };
    constructor(private store: IKeyConfigStore, private spec: KeyConfigSpec) {
        super();
        // Bind this to keydownListener.
        this.keydownListener = this.keydownListener.bind(this);
    }
    /**
     * Start listening to the keydown event.
     * @returns Promise which resolves when started listening.
     */
    public listen(): Promise<void> {
        // Load key settings from the store.
        return loadKeySettings(this.store, this.spec).then(keys => {
            this.keys = keys;
            document.addEventListener('keydown', this.keydownListener, false);
            // Also listen to key setting changes.
            this.unlistenFunction = this.store.listen((keyid, key) => {
                if (key != null) {
                    this.keys[keyid] = key;
                } else {
                    // Use the default.
                    const sp = this.spec.find(({ id }) => id === keyid);
                    this.keys[keyid] = addKeyDefault(
                        (sp != null && sp.default) || {},
                    );
                }
            });
        });
    }
    /**
     * Stop listening to the keydown event.
     */
    public unlisten(): void {
        document.removeEventListener('keydown', this.keydownListener, false);
        if (this.unlistenFunction != null) {
            // Consume unlisten function if set.
            this.unlistenFunction();
            this.unlistenFunction = null;
        }
    }
    /**
     * Search a shortcut key for gien KeyboardEvent.
     */
    public getShortcutKey(e: KeyboardEvent): string | null {
        // Perform linear search for pressed key.
        getKeyDestructive(e, this.keyDest);
        for (const keyid in this.keys) {
            if (keyEqual(this.keys[keyid], this.keyDest)) {
                // This key is pressed
                return keyid;
            }
        }
        // Not found.
        return null;
    }
    private keydownListener(e: KeyboardEvent): void {
        const keyid = this.getShortcutKey(e);
        if (keyid != null) {
            const ce = new CustomEvent('key', {
                detail: keyid,
            });
            this.dispatchEvent(ce);
        }
    }
}
