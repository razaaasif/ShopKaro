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

export function deepCopy<T, S>(obj: T): T {
  let newObj: any = obj;
  if ((obj && typeof obj === 'object') || obj instanceof Map) {
    if (Array.isArray(obj)) {
      newObj = [];
      for (let index = 0; index < obj.length; index++) {
        newObj[index] = deepCopy(obj[index]);
      }
    } else if (obj instanceof Map) {
      newObj = new Map<T, S>();
      for (const [key, value] of Object.entries(obj)) {
        newObj.set(deepCopy(key), deepCopy(value));
      }
    } else {
      newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        newObj[key] = deepCopy(value);
      }
    }
  }
  return newObj;
}

export function nullSafeList<T>(obj: Array<T>): Array<T> {
  return isNullOrEmptyArray(obj) ? new Array<T>() : obj;
}

export function nullSafeMap<K, V>(obj: Map<K, V>): Map<K, V> {
  return obj != null && obj.size === 0 ? new Map<K, V>() : obj;
}
