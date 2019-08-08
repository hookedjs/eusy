/**
 * Like Partial, but recursive!
 *
 * Borrowed from react-native-elements
 */
declare type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
