type JsonMapperSignature<TDefaultResult> = <TJsonResult>(value: string) => TJsonResult | TDefaultResult;

export type JsonMapper<TJsonResult> = JsonMapperSignature<TJsonResult> & {
    default: <TDefaultResult>(value: TDefaultResult) => JsonMapper<TDefaultResult>;
};

interface IJsonMapperOptions<TDefaultResult> {
    default: TDefaultResult;
}

const factory = <TDefaultResult>(options: Readonly<IJsonMapperOptions<TDefaultResult>>): JsonMapper<TDefaultResult> => {
    const mapper: JsonMapper<TDefaultResult> = <TJsonResult>(json: string): TJsonResult | TDefaultResult => {
        try {
            return JSON.parse(json);
        } catch (e) {
            return options.default;
        }
    };

    mapper.default = <TJSonResult>(defaultResult: TJSonResult) =>
        factory<TJSonResult>({
            ...options,
            default: defaultResult,
        });

    return mapper;
};

export const jsonMapper = factory({
    default: null,
});
