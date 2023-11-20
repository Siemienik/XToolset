export type ViewModel = any;

export const createVmProxyHandler = ()=> {
    const data: Record<string | number, unknown> = {};

    return {
        get(target: any, p: PropertyKey): any {
            if (typeof p !== 'string' && typeof p !== 'number') {
                return;
            }
            return p in data ? data[p] : target[p]
        },
        set(target: unknown, p: PropertyKey, value: unknown): boolean {
            if (typeof p !== 'string' && typeof p !== 'number') {
                return false;
            }
            data[p] = value

            return true
        },
    }
}
