/**
 * From T pick all properties except the set of properties K
 *
 * This allows you to exclude an attribute from an interface or type
 *
 * Example:
 *
 * type ButtonStripped = Omit<ButtonProps, 'color'>;
 * export interface ButtonPropsExt extends ButtonStripped {}
 *
 * or
 *
 * export interface ButtonPropsExt extends Omit<ButtonProps, 'color'> {}
 *
 */

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
