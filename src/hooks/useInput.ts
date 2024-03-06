import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type UseInputReturn = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<string>>,
];

export const useInput = (initialState: string): UseInputReturn => {
  const [state, setState] = useState(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return [state, onChange, setState];
};
