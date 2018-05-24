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
}

/**
 * Specification of all shortcut commands.
 */
export type KeyConfigSpec = IOneKeySpec[];
