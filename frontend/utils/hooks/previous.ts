import { useEffect, useRef } from "react";

export default function usePrevious<Type>(value: Type): Type | undefined {
  const ref = useRef<Type>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
