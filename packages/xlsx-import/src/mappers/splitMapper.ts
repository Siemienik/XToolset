/**
 * @description Configurable, immutable **splitMapper** with possibility to use specific `itemMapper` or `separator`.
 * @see https://github.com/Siemienik/xlsx-import/issues/24
 * @see https://github.com/Siemienik/xlsx-import#mappers
 * @example standalone usaffe
 * ```js
 * // import {splitMapper} from ...;
 * splitMapper('a,b,c,,d,e'); // ["a", "b", "c", "", "d", "e"]
 * splitMapper.itemMapper<boolean>(isFilled)('a,b,c,,d,e'); // [true, true, true, false, true, true]
 * splitMapper.itemMapper<boolean>(isFilled).separator('.')('a,b,,c,d'); // [true]
 *
 * // or:
 * const dotMapper = splitMapper.itemMapper<string>(upperCaseMapper).separator('.');
 * dotMapper('a,b,,c,d'); // ["A,B,,C,D"]
 * dotMapper('a,b,.,c,d'); // ["A,B,", ",C,D"]
 * dotMapper('a.b.c.d'); // ["A", "B", "C", "D"]
 * ```
 *
 *  @example example cfg
 * ```js
 * {
 *   key: "interests",
 *   index:1,
 *   // map value from: `"Cycling | SKIING | HikiNg"` to: `["cycling", "skiing", "hiking"]`
 *   mapper: splitMapper.separator(" | ").itemMapper(lowerCaseMapper)
 * }
 * ```
 */

import { ValueMapper } from '../abstracts/ValueMapper';
import { stringMapper } from './stringMapper';

export type SplitMapper<TItem> = ValueMapper<TItem[]> & {
    separator: (separator: string) => SplitMapper<TItem>;
    itemMapper: <TMapper>(itemMapper: ValueMapper<TMapper>) => SplitMapper<TMapper>;
};

interface ISplitMapperOptions<TItem> {
    separator: string;
    itemMapper: ValueMapper<TItem>;
}

const factory = <TItem>(options: Readonly<ISplitMapperOptions<TItem>>): SplitMapper<TItem> => {
    const mapper: SplitMapper<TItem> = (value: string) => value.split(options.separator).map(options.itemMapper);

    mapper.separator = separator => factory({ ...options, separator });
    mapper.itemMapper = <TMapper>(itemMapper: ValueMapper<TMapper>) => factory<TMapper>({ ...options, itemMapper });

    return mapper;
};

export const splitMapper: SplitMapper<string> = factory<string>({
    itemMapper: stringMapper,
    separator: ',',
});
