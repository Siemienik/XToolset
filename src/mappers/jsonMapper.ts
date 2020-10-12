import { ValueMapper } from '../abstracts/ValueMapper';

const parseJSON = (value: string): IJsonResult | null => {
    try {
        return JSON.parse(value)
    } catch (e) {
        return null
    }
}

interface IJsonResult {
    [key: string]: string | boolean | number
}

export const jsonMapper: ValueMapper<IJsonResult | null> = parseJSON
