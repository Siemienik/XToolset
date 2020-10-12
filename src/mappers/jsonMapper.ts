import { ValueMapper } from '../abstracts/ValueMapper';

const parseJSON = (value: string): TJsonResult | null => {
    try {
        return JSON.parse(value)
    } catch (e) {
        return null
    }
}

interface TJsonResult {
    [key: string]: string | boolean | number
}

export const jsonMapper: ValueMapper<TJsonResult | null> = parseJSON
