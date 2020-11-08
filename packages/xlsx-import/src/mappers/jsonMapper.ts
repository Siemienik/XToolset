type JsonMapper = <TJsonResult>(value: string) => TJsonResult | null;

export const jsonMapper: JsonMapper = <TJsonResult extends any>(value: string): TJsonResult | null => {
    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
};
