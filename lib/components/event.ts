import { IKey } from '../key.js';

/**
 * Detail of key-change event.
 */
export interface IKeyChangeDetail {
    keyid: string | null;
    key: IKey;
}
