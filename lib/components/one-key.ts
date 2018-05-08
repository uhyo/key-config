import { fragment } from '../fragment';
import { IKey, keyStringify } from '../key';

/**
 * Config of one key.
 */
export class OneKey extends HTMLElement {
    private keyText: HTMLElement;
    private _key: IKey;
    static get observedAttributes() {
        return ['label'];
    }
    constructor() {
        super();

        this._key = {
            altKey: false,
            ctrlKey: false,
            key: '',
            metaKey: false,
            shiftKey: false,
        };
        const f = this.attachShadow({
            mode: 'open',
        });

        f.appendChild(fragment`
            <div class='wrapper'>
                <span class='key-text'></span>
            </div>
        `);

        this.keyText = f.querySelector('.key-text') as HTMLElement;
    }
    get key(): Readonly<IKey> {
        return this._key;
    }
    set key(k: Readonly<IKey>) {
        // shallow-copy
        this._key = {
            ...k,
        };
        // Rewrite the label.
        this.keyText.textContent = keyStringify(k);
    }
}
