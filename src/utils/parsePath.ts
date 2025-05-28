export function parsePath(path: string): string[] {
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
            i += 2;
            if (i < path.length && path[i] === '.') {
                i++;
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
