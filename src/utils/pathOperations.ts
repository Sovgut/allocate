import { parsePath } from "./parsePath.ts";

export function getValueByPath(obj: any, path: string): any {
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

export function setValueByPath(obj: any, path: string, value: any): void {
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

export function deleteValueByPath(obj: any, path: string): void {
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
    
    traverse(obj, 0);
}
