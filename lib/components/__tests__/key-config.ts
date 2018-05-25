import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';

import { IKey } from '../../key.js';
import { IKeyChangeDetail } from '../event.js';
import { KeyConfig } from '../key-config.js';
import { keyconfig } from '../name.js';
import { register } from '../register.js';

register();
use(matchSnapshot);

describe('key-config', () => {
    it('instance of KeyConfig is an HTMLElement', () => {
        const component = new KeyConfig();
        expect(component).to.be.an.instanceof(HTMLElement);
        expect(component.tagName).to.equal(keyconfig.toUpperCase());
    });
    it('key-config renders key-table', () => {
        const component = new KeyConfig();
        component.label = 'Label!';
        expect(component.shadowRoot!.innerHTML).to.matchSnapshot();
    });
    it('loads each key config from store', () => {
        const component = new KeyConfig();
        const log: string[] = [];
        const store = new TestStore(log);

        return component
            .connect(store, [
                {
                    id: 'foo',
                    name: 'Foooo',
                },
                {
                    id: 'bar',
                    name: 'Barbara',
                },
            ])
            .then(() => {
                expect(log).to.matchSnapshot();
            });
    });
    it('writes to store when key-change event is fired', () => {
        const component = new KeyConfig();
        const log: string[] = [];
        const store = new TestStore(log);

        return component
            .connect(store, [
                {
                    id: 'foo',
                    name: 'Foooo',
                },
                {
                    id: 'bar',
                    name: 'Barbara',
                },
            ])
            .then(() => {
                component.dispatchEvent(
                    new CustomEvent<IKeyChangeDetail>('key-change', {
                        detail: {
                            key: {
                                altKey: false,
                                ctrlKey: false,
                                key: 'Z',
                                metaKey: false,
                                shiftKey: true,
                            },
                            keyid: 'foo',
                        },
                    }),
                );
                expect(log).to.matchSnapshot();
            });
    });
    it('Nothing happens when not connected but key-change is fired', () => {
        const component = new KeyConfig();
        const log: string[] = [];
        const store = new TestStore(log);

        component.dispatchEvent(
            new CustomEvent<IKeyChangeDetail>('key-change', {
                detail: {
                    key: {
                        altKey: false,
                        ctrlKey: false,
                        key: 'Z',
                        metaKey: false,
                        shiftKey: true,
                    },
                    keyid: 'foo',
                },
            }),
        );
        expect(log).to.matchSnapshot();
    });
});

class TestStore {
    constructor(public log: string[]) {}
    public get(keyids: string[]): Promise<Record<string, IKey | undefined>> {
        this.log.push(`get ${keyids}`);
        const result: any = {};
        for (const id of keyids) {
            result[id] = {
                altKey: false,
                ctrlKey: false,
                key: 'w',
                metaKey: false,
                shiftKey: false,
            };
        }
        return Promise.resolve(result);
    }
    public set(keyid: string, key: IKey): Promise<void> {
        this.log.push(`set ${keyid} ${JSON.stringify(key)}`);
        return Promise.resolve();
    }
}
