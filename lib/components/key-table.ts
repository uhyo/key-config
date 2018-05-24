import { fragment } from '../fragment.js';
import { IKey } from '../key.js';
import { KeyConfigSpec } from '../spec.js';
import { onekey } from './name.js';
import { OneKey } from './one-key.js';

/**
 * Table of key configs.
 */
export class KeyConfigTable extends HTMLElement {
    private table: HTMLTableElement;
    private spec: KeyConfigSpec = [];
    static get observedAttributes() {
        return ['label'];
    }
    constructor() {
        super();

        const f = this.attachShadow({
            mode: 'open',
        });

        f.appendChild(fragment`
            <table class='table'>
            </table>
        `);

        this.table = f.querySelector('.table') as HTMLTableElement;
    }
    public attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name === 'label') {
            // Propagate change to all contents.
            for (const kc of Array.from<OneKey>(
                this.table.querySelectorAll(onekey),
            )) {
                kc.label = newValue;
            }
        }
    }
    /**
     * Privide spec to this element.
     */
    public setSpec(spec: KeyConfigSpec): void {
        // Clone the element.
        this.spec = spec.map(({ id, name }) => ({
            id,
            name,
        }));

        const table = this.table;
        const label = this.getAttribute('label') || '';

        // Update content of table.
        // First, remove all rows.
        while (table.rows.length > 0) {
            table.deleteRow(0);
        }
        for (const { id, name } of this.spec) {
            const row = table.insertRow();

            const nameCell = row.insertCell();
            nameCell.textContent = name;

            const kcCell = row.insertCell();
            const kc = new OneKey();
            kc.setAttribute('keyid', id);
            kc.label = label;
            kcCell.appendChild(kc);
        }
    }
    /**
     * Set key of given id.
     */
    public setKey(id: string, key: IKey): void {
        const kc = this.table.querySelector(
            `${onekey}[keyid="${CSS.escape(id)}"]`,
        ) as OneKey;
        if (kc == null) {
            throw new Error(`Key id "${id}" is not known.`);
        }
        kc.key = key;
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
