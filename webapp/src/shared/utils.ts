import { Subscription } from 'rxjs';
import { CartModel } from './model/cart-status.model';
import { ProductModel } from './model/product.model';
import { FormControl, ValidationErrors } from '@angular/forms';
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
  if (typeof str === 'number' && !isNaN(str)) {
    return str;
  }
  if (str != null) {
    str = String(str).trim();
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

export function setOfferPrice(
  product: ProductModel | CartModel,
  unit: number = 1
): void {
  product.off = 1 * 10;
  product.newPrice = product.unitPrice * unit * (1 - product.off / 100);
}

type ValidationType = 'text' | 'number' | 'onlyText' | 'isValidText';

function createValidationFunction(
  validationType: ValidationType
): (control: FormControl) => ValidationErrors {
  const patterns: {
    [key in ValidationType]: { pattern: RegExp; errorMessage: string };
  } = {
    text: {
      pattern: /^[a-zA-Z0-9, ]*$/,
      errorMessage: 'Value contains invalid characters.',
    },
    number: {
      pattern: /^[0-9]*$/,
      errorMessage: 'Only numeric values allowed.',
    },
    onlyText: {
      pattern: /^[a-zA-Z]*$/,
      errorMessage: 'Value contains invalid characters.',
    },
    isValidText: {
      pattern: /^[a-zA-Z\s]*$/,
      errorMessage: 'Only letters and whitespace allowed between characters.',
    },
  };

  const { pattern, errorMessage } = patterns[validationType];

  return (control: FormControl): ValidationErrors => {
    const value: any = safeTrim(control.value);

    if (value != null) {
      if (!pattern.test(value)) {
        return {
          validationError: errorMessage,
        };
      }
    }

    return null;
  };
}

export const isValidText = createValidationFunction('text');
export const isOnlyNumber = createValidationFunction('number');
export const isOnlyText = createValidationFunction('onlyText');
export const isWhiteSpaceAllowedBetween =
  createValidationFunction('isValidText');
