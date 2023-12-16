import { useState } from "react";

export function useLocalStorageState(initialState) {
  const [state, setState] = useState(initialState);
  return [state, setState];
}
