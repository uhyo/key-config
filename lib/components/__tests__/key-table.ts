import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';

import { IKey } from '../../key';
import { KeyConfigSpec } from '../../spec';
import { IKeyChangeDetail } from '../event';
import { KeyConfigTable } from '../key-table';
import { keytable, onekey } from '../name';
import { OneKey } from '../one-key';
import { register } from '../register';

register();
use(matchSnapshot);

describe('key-table', () => {
    it('instance of KeyConfigTable is an HTMLElement', () => {
        const component = new KeyConfigTable();
        expect(component).to.be.an.instanceof(HTMLElement);
        expect(component.tagName).to.equal(keytable.toUpperCase());
    });
    it('Initial content of KeyConfigTable is empty', () => {
        const component = new KeyConfigTable();
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('setSpec() rerenders content', () => {
        const spec: KeyConfigSpec = [
            {
                id: 'foo',
                name: 'Foo shortcut',
            },
            {
                id: 'bar',
                name: 'ばあああああ',
            },
        ];

        const component = new KeyConfigTable();
        component.label = 'Label';
        component.setSpec(spec);
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('properly update label', () => {
        const spec: KeyConfigSpec = [
            {
                id: 'foo',
                name: 'Foo shortcut',
            },
            {
                id: 'bar',
                name: 'ばあああああ',
            },
        ];

        const component = new KeyConfigTable();
        component.label = 'Label';
        component.setSpec(spec);

        component.label = 'New Label!';
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('second setSpec() replaces content', () => {
        const spec1: KeyConfigSpec = [
            {
                id: 'foo',
                name: 'Foo shortcut',
            },
            {
                id: 'bar',
                name: 'ばあああああ',
            },
        ];

        const component = new KeyConfigTable();
        component.label = 'Label';
        component.setSpec(spec1);

        const spec2: KeyConfigSpec = [
            {
                id: 'baz',
                name: 'BazBazBaz',
            },
            {
                id: 'hoge',
                name: 'piyo',
            },
        ];
        component.setSpec(spec2);
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('setKey() updates key of inner kc-one', () => {
        const spec: KeyConfigSpec = [
            {
                id: 'foo',
                name: 'Foo shortcut',
            },
            {
                id: 'bar',
                name: 'ばあああああ',
            },
        ];

        const component = new KeyConfigTable();
        component.label = 'Label';
        component.setSpec(spec);
        component.setKey('foo', {
            altKey: false,
            ctrlKey: false,
            key: 's',
            metaKey: false,
            shiftKey: false,
        });

        const innerKey = component.shadowRoot!.querySelector(
            `${onekey}[keyid="foo"]`,
        ) as OneKey;
        expect(innerKey.key).to.eql({
            altKey: false,
            ctrlKey: false,
            key: 's',
            metaKey: false,
            shiftKey: false,
        });
    });
    it('setKey() to unexistent keyid throws an error', () => {
        const spec: KeyConfigSpec = [
            {
                id: 'foo',
                name: 'Foo shortcut',
            },
            {
                id: 'bar',
                name: 'ばあああああ',
            },
        ];

        const component = new KeyConfigTable();
        component.label = 'Label';
        component.setSpec(spec);

        expect(() => {
            component.setKey('baz', {
                altKey: false,
                ctrlKey: false,
                key: 's',
                metaKey: false,
                shiftKey: false,
            });
        }).to.throw();
    });
    it('label attribute reflects label attribute', () => {
        const component = new KeyConfigTable();
        component.setAttribute('label', 'Label!!!');
        expect(component.label).to.equal('Label!!!');
    });
    it('setSpec() success when label is not set', () => {
        const spec: KeyConfigSpec = [
            {
                id: 'foo',
                name: 'Foo shortcut',
            },
            {
                id: 'bar',
                name: 'ばあああああ',
            },
        ];

        const component = new KeyConfigTable();
        component.setSpec(spec);
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('label property returns empty string when not set', () => {
        const component = new KeyConfigTable();
        expect(component.label).to.equal('');
    });
});
