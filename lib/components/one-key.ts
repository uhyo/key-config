import { fragment } from '../fragment';
import { getKey, IKey, keyStringify } from '../key';

/**
 * Config of one key.
 */
export class OneKey extends HTMLElement {
    private keyText: HTMLElement;
    private wrapper: HTMLElement;
    private _key: IKey;
    private waiting: boolean = false;
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

        this.wrapper = f.querySelector('.wrapper') as HTMLElement;
        this.keyText = f.querySelector('.key-text') as HTMLElement;

        this.initEvent();
    }
    public attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name === 'label' && this.waiting) {
            // If the label is shown, it should be updated.
            this.keyText.textContent = newValue;
        }
    }
    /**
     * Initialize events for my component.
     */
    private initEvent() {
        // Init an event for clicking the key button.
        this.addEventListener(
            'click',
            (e: Event) => {
                if (this.waiting) {
                    return;
                }
                this.waiting = true;
                // Show press-a-key message
                this.keyText.textContent = this.label;

                const keydownHandler = (ke: KeyboardEvent) => {
                    // Move back to the waiting state.
                    this.waiting = false;
                    ke.preventDefault();
                    // update my key.
                    this.key = getKey(ke);

                    this.ownerDocument.removeEventListener(
                        'keydown',
                        keydownHandler,
                        false,
                    );
                };

                this.ownerDocument.addEventListener(
                    'keydown',
                    keydownHandler,
                    false,
                );
            },
            false,
        );
    }
    get key(): Readonly<IKey> {
        return this._key;
    }
    set key(k: Readonly<IKey>) {
        // shallow-copy
        this._key = {
            ...k,
        };
        if (!this.waiting) {
            // Rewrite the label.
            this.keyText.textContent = keyStringify(k);
        }
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
