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


export function isNullOrEmptyArray<T>(array:Array<T>):boolean{
  return array == null || array.length === 0 ; 
}