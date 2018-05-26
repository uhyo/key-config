import { IKey } from './key.js';
/**
 * Specification of one shortcut command.
 */
export interface IOneKeySpec {
    /**
     * Unique ID of this shortcut command.
     */
    id: string;
    /**
     * Displayed name of this shortcut command.
     */
    name: string;
    /**
     * Default setting of keyboard shortcut.
     */
    default?: Partial<IKey>;
}

/**
 * Specification of all shortcut commands.
 */
export type KeyConfigSpec = IOneKeySpec[];

/**
 * Store of key config.
 */
export interface IKeyConfigStore {
    /**
     * Load Setting of given key.
     */
    get(keyids: string[]): Promise<Record<string, IKey | undefined>>;
    /**
     * Save given key setting.
     */
    set(keyid: string, key: IKey): Promise<void>;
}
