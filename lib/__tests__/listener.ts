import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';

import { IKey } from '../key.js';
import { KeyListener } from '../listener';

use(matchSnapshot);

const defaultSpec = [
    {
        default: {
            ctrlKey: true,
            key: 'S',
        },
        id: 'foo',
        name: 'Foo shortcut',
    },
    {
        id: 'bar',
        name: 'Bar',
    },
];

describe('keyListener', () => {
    it('does not touch store when just constructed', () => {
        const log: string[] = [];
        const store = new TestStore(log);

        const instance = new KeyListener(store, defaultSpec);

        expect(log).to.eql([]);
    });
    it('Load key data from store and then listen when listen()', async () => {
        const log: string[] = [];
        const store = new TestStore(log);

        const instance = new KeyListener(store, defaultSpec);
        await instance.listen();

        expect(log).to.eql(['get foo,bar', 'listen']);
        instance.unlisten();
        expect(log).to.eql(['get foo,bar', 'listen', 'unlisten']);
    });
    it('Emits key event when listening', async () => {
        const log: string[] = [];
        const store = new TestStore(log);

        const instance = new KeyListener(store, defaultSpec);
        await instance.listen();

        const keyids: string[] = [];
        const handler = (ev: any) => keyids.push(ev.detail);
        instance.addEventListener('key', handler);

        // shortcut for 'foo'
        document.dispatchEvent(
            new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 's',
            }),
        );

        // shortcut for nothing
        document.dispatchEvent(
            new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 'Z',
                shiftKey: true,
            }),
        );

        instance.removeEventListener('key', handler);
        instance.unlisten();

        expect(keyids).to.eql(['foo']);
    });
    it('Respects changes to the store', async () => {
        const log: string[] = [];
        const store = new TestStore(log);

        const instance = new KeyListener(store, defaultSpec);
        await instance.listen();

        const keyids: string[] = [];
        const handler = (ev: any) => keyids.push(ev.detail);
        instance.addEventListener('key', handler);

        // shortcut for 'foo'
        document.dispatchEvent(
            new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 's',
            }),
        );

        // Change shortcut of 'foo'
        store.emitChange('foo', {
            altKey: false,
            ctrlKey: true,
            key: 'Z',
            metaKey: false,
            shiftKey: true,
        });

        // new shortcut for 'foo'
        document.dispatchEvent(
            new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 'Z',
                shiftKey: true,
            }),
        );

        // Change shortcut of 'foo' to the default
        store.emitChange('foo', null);

        // shortcut for 'foo'
        document.dispatchEvent(
            new KeyboardEvent('keydown', {
                ctrlKey: true,
                key: 's',
            }),
        );

        instance.removeEventListener('key', handler);
        instance.unlisten();

        expect(keyids).to.eql(['foo', 'foo', 'foo']);
    });
});

class TestStore {
    private callbacks: Array<(keyid: string, key: IKey | null) => void> = [];
    constructor(public log: string[]) {}
    public get(keyids: string[]): Promise<Record<string, IKey | undefined>> {
        this.log.push(`get ${keyids}`);
        return Promise.resolve({});
    }
    public set(keyid: string, key: IKey): Promise<void> {
        this.log.push(`set ${keyid} ${JSON.stringify(key)}`);
        return Promise.resolve();
    }
    public listen(
        callback: (keyid: string, key: IKey | null) => void,
    ): (() => void) {
        this.log.push('listen');
        this.callbacks.push(callback);
        // Listen is just noop here.
        return () => {
            this.callbacks = this.callbacks.filter(f => f !== callback);
            this.log.push('unlisten');
        };
    }
    /**
     * Perform changes to the store for testing.
     */
    public emitChange(keyid: string, key: IKey | null): void {
        for (const f of this.callbacks) {
            f(keyid, key);
        }
    }
}
