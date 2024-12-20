export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
export function isNull(value: unknown): value is null {
  return value === null;
}

export function isEmpty<T = unknown>(value: T): value is T {
  if (typeof value === 'boolean') return false;

  return (
    value == null ||
    (typeof value === 'object' && Array.isArray(value)
      ? value.length === 0
      : Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}

export function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`;
}

export function negate(func: Function) {
  return (...args: unknown[]) => !func(...args);
}

export function pickBy(obj: object, predicate = (v: unknown) => v) {
  const target: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (predicate(value)) target[key] = value;
  }
  return target;
}

export function union(arr: unknown[] | undefined, ...args: unknown[]) {
  if (typeof arr !== 'undefined') {
    return Array.from(new Set(arr.concat(...args)));
  } else {
    return [];
  }
}

export function* shuffle(collection: unknown[]) {
  collection = [...collection];
  while (collection.length)
    yield collection.splice((Math.random() * collection.length) | 0, 1)[0];
}

export const math = {
  min(...values: number[]): number | undefined {
    if (values.length > 0) return Math.min(...values);
  },
  ceil(value: number, precision?: number | undefined): number {
    const modifier = precision ? 10 * precision : 1;
    return Math.ceil(value * modifier) / modifier;
  },
  random(lower = 0, upper: number, floating?: boolean) {
    if (typeof upper === 'boolean') {
      floating = upper;
    }
  
    if (isNaN(upper)) {
      upper = lower < 0 ? 0 : 1;
    }
  
    if (typeof floating === 'undefined') {
      floating = !Number.isInteger(lower) || !Number.isInteger(upper);
    }
  
    const randomNumber = Math.random() * (upper - lower) + lower;
    return floating ? randomNumber : Math.round(randomNumber);
  }
};

export function getStringAsNumber(
  value: string | null,
  defaultValue: number = 0
) {
  return Number(value) || defaultValue;
}

export function stringify(obj: object) {
  Object.entries(obj).forEach(([key, val]) => {
    if (isEmpty(val)) {
      delete obj[key as keyof typeof obj];
    }
  });
  return JSON.stringify(obj);
}

export function getExtension(srcString: string) {
  return srcString.substring(srcString.lastIndexOf('.') + 1);
}

export function isValidFileFormat(file: File, formats: String[] | String) {
  const ext = getExtension(file.name);
  if (Array.isArray(formats)) {
    return formats.includes(ext);
  } else {
    return formats === ext;
  }
}