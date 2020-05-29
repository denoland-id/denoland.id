import * as React from "react";

type ValueType<T> = T extends infer U ? U : T;

// https://usehooks.com/useDebounce
const useDebounce = <T>(value: ValueType<T>, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const forceUpdate = () => setDebouncedValue(value);

  return [debouncedValue, forceUpdate] as [ValueType<T>, () => {}];
};

export default useDebounce;
