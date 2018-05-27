import { fragment } from '../fragment.js';
import { IKey } from '../key.js';
import { loadKeySettings } from '../load.js';
import { IKeyConfigStore, KeyConfigSpec } from '../spec.js';
import { IKeyChangeDetail } from './event.js';
import { KeyConfigTable } from './key-table.js';

/**
 * Key Config for Chrome extension.
 */
export class KeyConfig extends HTMLElement {
    private table: KeyConfigTable;
    private spec: KeyConfigSpec = [];
    private store: IKeyConfigStore | null = null;
    static get observedAttributes() {
        return ['label'];
    }
    constructor() {
        super();

        const f = this.attachShadow({
            mode: 'open',
        });

        this.table = new KeyConfigTable();
        this.table.label = this.label;
        f.appendChild(this.table);
        // Register an event.
        this.addEventListener(
            'key-change',
            ((e: CustomEvent<IKeyChangeDetail>) => {
                const { keyid, key } = e.detail;
                // Register this to storage.
                if (keyid == null || this.store == null) {
                    return;
                }
                this.store
                    .set(keyid, key)
                    .catch((err: any) => console.error(err));
            }) as any,
            false,
        );
    }
    public connect(store: IKeyConfigStore, spec: KeyConfigSpec): Promise<void> {
        this.store = store;
        this.spec = spec;
        this.table.setSpec(spec);
        return this.loadKeySetting();
    }
    public attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name === 'label') {
            // Propagate change to the table.
            this.table.label = newValue;
        }
    }
    protected loadKeySetting(): Promise<void> {
        return loadKeySettings(this.store!, this.spec).then(keys => {
            for (const key of Object.keys(keys)) {
                this.table.setKey(key, keys[key]);
            }
        });
    }
    /**
     * `label` properties is an accessor to the label attribute.
     */
    get label(): string {
        return this.getAttribute('label') || '';
    }
    set label(value: string) {
        this.setAttribute('label', value);
    }
}
