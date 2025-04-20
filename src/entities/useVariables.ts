'use client';

import Storage from '~/utils/storage';

const storage = new Storage();
const setVariable = (name: string, value: string) => storage.set(`variables.${name}`, value);
const getVariables = () => storage.get<Record<string, string>>('variables');
const setAllVariables = (value: Record<string, string>) => storage.set('variables', value);

export default function useVariables() {
  return { setVariable, getVariables, setAllVariables };
}
