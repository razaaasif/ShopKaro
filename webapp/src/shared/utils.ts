import { Subscription } from 'rxjs';
export function replaceUrlParameters(
  url: string,
  ...dynamicValues: any[]
): string {
  return url.replace(/\{(\d)\}/g, (match, index) => {
    return dynamicValues[index];
  });
}

export function unsubscribe(subscription: Array<Subscription>) {
  subscription?.forEach((e) => e.unsubscribe());
}

export function safeTrim(str: string) {
  if (str != null) {
    str = str.trim();
    return str.length === 0 ? '' : str;
  }
  return '';
}

export function isNullOrEmptyArray<T>(array: Array<T>): boolean {
  return array == null || array.length === 0;
}

export function deepCopy<T>(oldObj: T, visited = new WeakMap<any, any>()): T {
  if (oldObj && typeof oldObj === 'object') {
    if (visited.has(oldObj)) {
      return visited.get(oldObj); // Return previously visited object to handle circular references
    }

    const newObj = Array.isArray(oldObj)
      ? []
      : Object.create(Object.getPrototypeOf(oldObj));
    visited.set(oldObj, newObj);

    if (Array.isArray(oldObj)) {
      for (const value of oldObj) {
        newObj.push(deepCopy(value, visited));
      }
    } else if (oldObj instanceof Map) {
      for (const [key, value] of oldObj.entries()) {
        newObj.set(deepCopy(key, visited), deepCopy(value, visited));
      }
    } else {
      for (const [key, value] of Object.entries(oldObj)) {
        newObj[key] = deepCopy(value, visited);
      }
    }

    return newObj as T;
  } else {
    return oldObj; // Return non-object values directly (e.g., numbers, strings, null, etc.)
  }
}

export function nullSafeList<T>(obj: Array<T>): Array<T> {
  return isNullOrEmptyArray(obj) ? new Array<T>() : obj;
}

export function nullSafeMap<K, V>(obj: Map<K, V>): Map<K, V> {
  return obj != null && obj.size === 0 ? new Map<K, V>() : obj;
}
