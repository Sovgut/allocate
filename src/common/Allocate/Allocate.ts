import { deepClone } from '~/utils/deepClone.ts';
import { getValueByPath, setValueByPath, deleteValueByPath } from '~/utils/pathOperations.ts';

export function allocate(source: Record<string, unknown> | Record<string, unknown>[] | undefined | null, schema: Record<string, string>): any {
    if (source === null || source === undefined || typeof source !== 'object') {
        return source;
    }

    const result = deepClone(source);

    for (const [fromPath, toPath] of Object.entries(schema)) {
        const value = getValueByPath(source, fromPath);
        
        setValueByPath(result, toPath, value);
        
        if (fromPath !== toPath) {
            deleteValueByPath(result, fromPath);
        }
    }

    return result;
}