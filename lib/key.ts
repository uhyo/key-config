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
    // Convert single alphabet string to uppercase one.
    const keyStr = /^[a-z]$/.test(key) ? key.toUpperCase() : key;
    return {
        altKey,
        ctrlKey,
        key: keyStr,
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

    // some key has special string.
    const keyStr = key === ' ' ? 'Space' : key;
    result += keyStr;
    return result;
}

/**
 * Add default values to partial IKey.
 */
export function addKeyDefault(key: Partial<IKey>): IKey {
    return {
        altKey: false,
        ctrlKey: false,
        key: '',
        metaKey: false,
        shiftKey: false,
        ...key,
    };
}
