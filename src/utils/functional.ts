import { useEffect, useState } from 'react';

export function themeProp(propPath: string) {
  return (props: any) =>
    propPath.split('.').reduce((acc, item) => acc[item], props.theme);
}

export function themeGrid(multiplier: number) {
  return (props: any) => props.theme.grid(multiplier);
}

export function intersperse<T>(value: React.ReactNode | Function) {
  return function innerFnIntersperse(arr: T[]) {
    return arr
      .map((item) => [item])
      .reduce((acc, subArr, i) =>
        acc.concat(typeof value === 'function' ? value(i) : value, subArr)
      );
  };
}

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function debounce(func: Function, wait: number) {
  let timeout: number | undefined;
  return function (this: any, ...args: any[]) {
    let context = this;
    let later = function () {
      timeout = undefined;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function parseDate(dateString: string): Date | undefined {
  const [date, month, year] = dateString.split('/');
  const reversedParsedDate = Date.parse(
    `${[year, month, date].join('-')}T00:00:00Z`
  );

  if (!+reversedParsedDate) return;

  return new Date(reversedParsedDate);
}

export function calculateAge(birthday: Date) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function getEnumKeyByEnumValue<
  T extends { [index: string]: string | number }
>(myEnum: T, enumValue: string | number): keyof T | null {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
}
