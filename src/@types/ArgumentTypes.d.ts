/**
 * Extract the types of a function.
 *
 * In the case that function arg types are declared inline, you can use this type to extract them.
 *
 * Example:
 *
 * const f = (arg1: string, arg2: string) => null;
 * type arg1Type = ArgumentTypes<typeof f>[0];
 * type arg2Type = ArgumentTypes<typeof f>[1];
 *
 * or
 *
 * const f = ({prop1: string, prop2: string}) => null;
 * type prop1Type = ArgumentTypes<typeof f>[0]['prop1'];
 * type prop2Type = ArgumentTypes<typeof f>[0]['prop2'];
 *
 */

declare type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
