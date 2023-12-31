import {pick} from "../pick";
import {allocateObject} from "../allocate-object";
import {allocateArray} from "../allocate-array";
import {CURRENT_KEY, REQUIRED_KEY} from "../../constants";
import {type Keys} from "../../types";

/**
 * Invokes the appropriate allocate function based on the source.
 * @param {any} source - The source structure (object or array).
 * @param {Keys} keys - A tuple of current and required keys.
 * @return {any} - The resulting object after key allocation.
 */
export function invoke(source: any, keys: Keys): any {
    const [currentKey, restCurrent] = pick(keys[CURRENT_KEY]);
    const [requiredKey, restRequired] = pick(keys[REQUIRED_KEY]);

    if (currentKey === "*") {
        return allocateArray(source, [restCurrent, restRequired]);
    }

    return allocateObject(source, [currentKey, requiredKey], [restCurrent, restRequired]);
}