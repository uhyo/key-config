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
export function getKey(ke: KeyboardEvent): IKey {
    const dest: any = {};
    getKeyDestructive(ke, dest);
    return dest;
}

/**
 * Extract key information from KeyboardEvent and
 * write to the passed object.
 */
export function getKeyDestructive(
    { key, shiftKey, ctrlKey, altKey, metaKey }: KeyboardEvent,
    dest: IKey,
): void {
    // Convert single alphabet string to uppercase one.
    const keyStr = /^[a-z]$/.test(key) ? key.toUpperCase() : key;
    dest.altKey = altKey;
    dest.ctrlKey = ctrlKey;
    dest.key = keyStr;
    dest.metaKey = metaKey;
    dest.shiftKey = shiftKey;
}

/**
 * Check equality of IKey.
 */
export function keyEqual(left: IKey, right: IKey): boolean {
    return (
        left.altKey === right.altKey &&
        left.ctrlKey === right.ctrlKey &&
        left.key === right.key &&
        left.metaKey === right.metaKey &&
        left.shiftKey === right.shiftKey
    );
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
