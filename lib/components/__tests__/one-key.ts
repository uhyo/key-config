import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';

import { onekey } from '../name';
import { OneKey } from '../one-key';
import '../register';

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
});

/**
 * Wrap an element by div.
 */
function wrap(n: Node): HTMLElement {
    const div = document.createElement('div');
    div.appendChild(n);
    return div;
}
