export function allocate(source: any, schema: Record<string, string>): any {
    // Handle null/undefined
    if (source === null || source === undefined) {
        return source;
    }

    // Clone source to avoid mutations
    const result = deepClone(source);

    // Process each schema mapping
    for (const [fromPath, toPath] of Object.entries(schema)) {
        // Get value from source path
        const value = getValueByPath(source, fromPath);
        
        // Set value to destination path
        setValueByPath(result, toPath, value);
        
        // Remove old path if it's different from new path
        if (fromPath !== toPath) {
            deleteValueByPath(result, fromPath);
        }
    }

    return result;
}

function deepClone(obj: any): any {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(item => deepClone(item));
    const cloned: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

function getValueByPath(obj: any, path: string): any {
    const segments = parsePath(path);
    
    function traverse(current: any, segmentIndex: number): any {
        if (segmentIndex >= segments.length) {
            return current;
        }
        
        const segment = segments[segmentIndex];
        
        if (segment === '[]') {
            if (!Array.isArray(current)) return undefined;
            return current.map(item => traverse(item, segmentIndex + 1));
        }
        
        if (current === null || current === undefined) {
            return undefined;
        }
        
        return traverse(current[segment], segmentIndex + 1);
    }
    
    return traverse(obj, 0);
}

function setValueByPath(obj: any, path: string, value: any): void {
    const segments = parsePath(path);
    
    function traverse(current: any, segmentIndex: number, valueToSet: any): void {
        if (segmentIndex >= segments.length) {
            return;
        }
        
        const segment = segments[segmentIndex];
        const isLastSegment = segmentIndex === segments.length - 1;
        
        if (segment === '[]') {
            if (!Array.isArray(current)) return;
            
            current.forEach((item, index) => {
                const val = Array.isArray(valueToSet) ? valueToSet[index] : valueToSet;
                traverse(item, segmentIndex + 1, val);
            });
            return;
        }
        
        if (isLastSegment) {
            current[segment] = valueToSet;
        } else {
            const nextSegment = segments[segmentIndex + 1];
            
            if (nextSegment === '[]') {
                if (!(segment in current) || !Array.isArray(current[segment])) {
                    // Initialize array based on the value structure
                    if (Array.isArray(valueToSet)) {
                        current[segment] = valueToSet.map(() => ({}));
                    } else {
                        current[segment] = [];
                    }
                }
            } else {
                if (!(segment in current) || typeof current[segment] !== 'object' || current[segment] === null) {
                    current[segment] = {};
                }
            }
            
            traverse(current[segment], segmentIndex + 1, valueToSet);
        }
    }
    
    traverse(obj, 0, value);
}

function deleteValueByPath(obj: any, path: string): void {
    const segments = parsePath(path);
    
    function traverse(current: any, segmentIndex: number): boolean {
        if (segmentIndex >= segments.length || !current) {
            return false;
        }
        
        const segment = segments[segmentIndex];
        const isLastSegment = segmentIndex === segments.length - 1;
        
        if (segment === '[]') {
            if (!Array.isArray(current)) return false;
            
            let modified = false;
            current.forEach(item => {
                if (traverse(item, segmentIndex + 1)) {
                    modified = true;
                }
            });
            return modified;
        }
        
        if (isLastSegment) {
            if (segment in current) {
                delete current[segment];
                return true;
            }
            return false;
        }
        
        if (segment in current) {
            const deleted = traverse(current[segment], segmentIndex + 1);
            return deleted;
        }
        
        return false;
    }
    
    // Start traversal
    traverse(obj, 0);
}

function parsePath(path: string): string[] {
    const segments: string[] = [];
    let current = '';
    let i = 0;
    
    while (i < path.length) {
        if (path[i] === '[' && i + 1 < path.length && path[i + 1] === ']') {
            if (current) {
                segments.push(current);
                current = '';
            }
            segments.push('[]');
            i += 2; // Skip '[]'
            if (i < path.length && path[i] === '.') {
                i++; // Skip the dot after []
            }
        } else if (path[i] === '.') {
            if (current) {
                segments.push(current);
                current = '';
            }
            i++;
        } else {
            current += path[i];
            i++;
        }
    }
    
    if (current) {
        segments.push(current);
    }
    
    return segments;
}