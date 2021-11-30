
type callSignature = <TJsonResult, TDefaultResult>(value: string) => TJsonResult | TDefaultResult;

type JsonMapper = {
    default: <TDefaultResult>(defaultResult: TDefaultResult) => JsonMapper
} & callSignature;

interface IJsonMapperOptions {
    default: any;
}

const factory = (options: Readonly<IJsonMapperOptions>): JsonMapper => {
    const mapper = (json: string) => {
        try {
            return JSON.parse(json);
        } catch (e) {
            return options.default
        }
    }

    mapper.default = <TDefaultResult>(defaultResult: TDefaultResult) => factory({
        ...options,
        default: defaultResult
    });

    return mapper;
};



export const jsonMapper: JsonMapper = factory({
    default: null,
});