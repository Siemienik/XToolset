export type ViewModel = any;

export const createVmProxyHandler = () => {
    const data: Record<string | number, unknown> = {};

    return {
        get(target: any, p: PropertyKey): any {
            return p in data ? data[p as string] : target[p];
        },
        set(target: any, p: PropertyKey, value: unknown): boolean {
            data[p as string] = value;

            return true;
        },
    };
};
