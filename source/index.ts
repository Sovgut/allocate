type Key = string;
type Rest = string;

function pick(path: string): [Key, Rest] {
    const [key, ...rest] = path.split('.');

    return [key, rest.join('.')];
}

function process(source: any, current: string, required: string) {
    const [currentKey, restCurrent] = pick(current);
    const [requiredKey, restRequired] = pick(required);
    let allocated: any = {};

    if (currentKey === "*") {
        if (!Array.isArray(source)) return [];

        allocated = [];

        for (const item of source) {
            allocated.push(process(item, restCurrent, restRequired))
        }
    } else {
        if (restCurrent.length > 0 && restRequired.length > 0) {
            allocated[requiredKey] = process(source[currentKey], restCurrent, restRequired)
        } else {
            allocated[requiredKey] = source[currentKey];
        }
    }

    return allocated;
}

export function allocate(source: any, schema: any) {
    let allocated = Array.isArray(source) ? [] : {};

    for (const current of Object.keys(schema)) {
        const required = schema[current];

        if (Array.isArray(source)) {
            allocated = [...(allocated as any[]), ...process(source, current, required)]
        } else {
            allocated = {...allocated, ...process(source, current, required)}
        }


    }

    return allocated;
}