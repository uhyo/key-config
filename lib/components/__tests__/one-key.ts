import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';

import { IKey } from '../../key';
import { onekey } from '../name';
import { OneKey } from '../one-key';
import { register } from '../register';

register();
use(matchSnapshot);

describe('one-key', () => {
    it('instance of OneKey is an HTMLElement', () => {
        const component = new OneKey();
        expect(component).to.be.an.instanceof(HTMLElement);
        expect(component.tagName).to.equal(onekey.toUpperCase());
    });
    it('initial label is empty', () => {
        const component = new OneKey();
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('key property is saved', () => {
        const component = new OneKey();
        component.key = {
            altKey: false,
            ctrlKey: true,
            key: 'A',
            metaKey: false,
            shiftKey: true,
        };
        expect(component.key).to.eql({
            altKey: false,
            ctrlKey: true,
            key: 'A',
            metaKey: false,
            shiftKey: true,
        });
    });
    it('key property is not the same object set', () => {
        const component = new OneKey();
        const obj = {
            altKey: false,
            ctrlKey: true,
            key: 'A',
            metaKey: false,
            shiftKey: true,
        };
        component.key = obj;
        expect(component.key).not.to.equal(obj);
    });
    it('Label is changed when key is set', () => {
        const component = new OneKey();
        component.key = {
            altKey: false,
            ctrlKey: true,
            key: 'A',
            metaKey: false,
            shiftKey: true,
        };
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('Label is shown when clicked', () => {
        const component = new OneKey();
        component.label = 'Hey!';

        // simulate click.
        const ev = new MouseEvent('click', {
            bubbles: true,
            composed: true,
            // `as MouseEventInit` is temporal.
            // waiting for https://github.com/Microsoft/TSJS-lib-generator/pull/413
        } as MouseEventInit);
        component.shadowRoot!.querySelector('.key-text')!.dispatchEvent(ev);

        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('Click is handles for outer click event', () => {
        const component = new OneKey();
        component.label = 'Hey!';

        // simulate click.
        const ev = new MouseEvent('click');
        component.dispatchEvent(ev);

        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('Shown label is changed when attribute is changed', () => {
        const component = new OneKey();
        component.label = 'Hey!';

        // simulate click.
        const ev = new MouseEvent('click');
        component.dispatchEvent(ev);

        component.label = 'Hoy!';

        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('Key is rewritten when key is pressed', () => {
        const component = new OneKey();

        document.body.appendChild(component);

        // simulate click.
        const ev = new MouseEvent('click');
        component.dispatchEvent(ev);

        // simluate Shift+S key.
        const keyev = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'S',
            shiftKey: true,
        });

        const success = component.dispatchEvent(keyev);

        // KeyboardEvent should be canceled.
        // tslint:disable-next-line: no-unused-expression
        expect(success).to.be.false;

        expect(component.key).to.eql({
            altKey: false,
            ctrlKey: false,
            key: 'S',
            metaKey: false,
            shiftKey: true,
        });

        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();

        document.body.removeChild(component);
    });
    it('key-change event should be called', () => {
        const component = new OneKey();

        document.body.appendChild(component);

        let key: any;

        // add change listener.
        component.addEventListener(
            'key-change',
            (e: CustomEvent<IKey>) => {
                key = e.detail;
            },
            false,
        );

        // simulate click.
        const ev = new MouseEvent('click');
        component.dispatchEvent(ev);

        // simluate Shift+S key.
        const keyev = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'S',
            shiftKey: true,
        });

        component.dispatchEvent(keyev);

        // change ovent should have been dispached.
        expect(key).to.eql({
            altKey: false,
            ctrlKey: false,
            key: 'S',
            metaKey: false,
            shiftKey: true,
        });

        document.body.removeChild(component);
    });
    it('key should not be changed when key-change event is canceled', () => {
        const component = new OneKey();

        document.body.appendChild(component);

        const currentKey = component.key;

        // key-change listener to always cancel the event.
        component.addEventListener(
            'key-change',
            (e: CustomEvent<IKey>) => {
                e.preventDefault();
            },
            false,
        );

        // simulate click.
        const ev = new MouseEvent('click');
        component.dispatchEvent(ev);

        // simluate Shift+S key.
        const keyev = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'S',
            shiftKey: true,
        });

        component.dispatchEvent(keyev);

        // Key should not be changed here.
        expect(component.key).to.eql(currentKey);

        document.body.removeChild(component);
    });
    it('Modifier keys should not be a result of keyconfig itself', () => {
        const component = new OneKey();

        document.body.appendChild(component);

        let keyChangeFired = 0;

        // key-change listener to always cancel the event.
        component.addEventListener(
            'key-change',
            (e: CustomEvent<IKey>) => {
                keyChangeFired++;
            },
            false,
        );

        // simulate click.
        const ev = new MouseEvent('click');
        component.dispatchEvent(ev);

        // simluate Shift key.
        const keyev = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'Shift',
            shiftKey: true,
        });

        component.dispatchEvent(keyev);

        // This should not fire the key-change.
        expect(keyChangeFired).to.equal(0);

        // simluate Shift+S key.
        const keyev2 = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'S',
            shiftKey: true,
        });
        component.dispatchEvent(keyev2);

        expect(keyChangeFired).to.equal(1);

        document.body.removeChild(component);
    });
    it('Double-clicking should have no effect', () => {
        const component = new OneKey();

        document.body.appendChild(component);

        // simulate click twice.
        const ev = new MouseEvent('click');
        component.dispatchEvent(ev);
        const ev2 = new MouseEvent('click');
        component.dispatchEvent(ev2);

        // simluate Shift+S key.
        const keyev = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'S',
            shiftKey: true,
        });
        component.dispatchEvent(keyev);

        // Simulate Shift+A key.
        const keyev2 = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'A',
            shiftKey: true,
        });
        component.dispatchEvent(keyev2);

        // First key should be adapted.
        expect(component.key).to.eql({
            altKey: false,
            ctrlKey: false,
            key: 'S',
            metaKey: false,
            shiftKey: true,
        });

        document.body.removeChild(component);
    });
});

/**
 * Wrap an element by div.
 */
function wrap(n: Node): HTMLElement {
    const div = document.createElement('div');
    div.appendChild(n);
    return div;
}
