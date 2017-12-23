/**
 * Definition of one key stroke.
 */
export interface IKey {
    /**
     * Kind of key as string.
     * Follows the KeyboardEvent's key.
     */
    key: string;
    /**
     * Shift key modifier.
     */
    shiftKey: boolean;
    /**
     * Ctrl key modifier.
     */
    ctrlKey: boolean;
    /**
     * Alt key modifier.
     */
    altKey: boolean;
    /**
     * Meta key modifier.
     */
    metaKey: boolean;
}

/**
 * Extract an IKey from a KeyboardEvent.
 */
export function getKey({
    key,
    shiftKey,
    ctrlKey,
    altKey,
    metaKey,
}: KeyboardEvent): IKey {
    return {
        altKey,
        ctrlKey,
        key,
        metaKey,
        shiftKey,
    };
}

/**
 * Stringify a key.
 */
export function keyStringify({
    key,
    shiftKey,
    ctrlKey,
    altKey,
    metaKey,
}: IKey): string {
    let result = '';
    if (metaKey) {
        result += 'Meta+';
    }
    if (ctrlKey) {
        result += 'Ctrl+';
    }
    if (altKey) {
        result += 'Alt+';
    }
    if (shiftKey) {
        result += 'Shift+';
    }
    result += key;
    return result;
}
