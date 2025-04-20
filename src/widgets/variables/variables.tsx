'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader } from '~/components/loader/loader';
import useVariables from '~/entities/useVariables';

import styles from './variables.module.css';

const initialVariablesState = [{ '': '' }];

export default function Variables({ dict }: { dict: Record<string, string> }) {
  const { setVariable, getVariables, setAllVariables } = useVariables();
  const [vars, setVars] = useState<Record<string, string>[]>(initialVariablesState);

  useEffect(Loader.hide, []);

  useEffect(() => {
    const storedVariables = getVariables();
    if (storedVariables) {
      const newVariables = Object.entries(storedVariables).map(([name, value]) => ({ [name]: value }));
      setVars([...newVariables, { '': '' }]);
    }
  }, [getVariables]);

  const handleAdd = () => setVars(prev => [...prev, { '': '' }]);

  const variablesTable = useMemo(() => {
    const handleNameChange = (i: number, value: string, name: string) => {
      const newVariables = [...vars];
      newVariables[i] = { [name]: value };
      setVars(newVariables);

      const result = createResult(newVariables);
      setAllVariables(result);
    };

    const handleValueChange = (i: number, name: string, value: string) => {
      setVariable(name, value);
      const newVariables = [...vars];
      newVariables[i] = { [name]: value };
      setVars(newVariables);
    };

    const handleRemove = (index: number) => {
      const newVariables = vars.filter((_, i) => i !== index);
      setVars(newVariables);
      const result = createResult(newVariables);
      setAllVariables(result);
    };

    return (
      <>
        {vars.map((el, index) => {
          const name = Object.keys(el)[0];
          const value = Object.values(el)[0];
          return (
            <div key={index} className={styles.variables__row}>
              <div className={styles.variables__item}>
                <input
                  type="text"
                  placeholder={dict.namePlaceholder}
                  value={name}
                  onChange={e => handleNameChange(index, value, e.target.value)}
                />
              </div>
              <div className={styles.variables__item}>
                <input
                  type="text"
                  placeholder={dict.valuePlaceholder}
                  value={value}
                  onChange={e => handleValueChange(index, name, e.target.value)}
                />
              </div>
              <button className={styles.variables__remove} onClick={() => handleRemove(index)}>
                <img src="/icons/cross.svg" alt="delete" />
              </button>
            </div>
          );
        })}
      </>
    );
  }, [vars, dict.namePlaceholder, dict.valuePlaceholder, setVariable, setAllVariables]);

  const createResult = (items: Record<string, string>[]) =>
    items.reduce<Record<string, string>>((acc, item) => {
      const name = Object.keys(item)[0];
      if (name === '') return acc;
      acc[name] = item[name];
      return acc;
    }, {});

  return (
    <div className={styles.variables}>
      <h3 className={styles.variables__title}>{dict.title}</h3>
      <div className={styles.variables__table}>
        {variablesTable}
        <div className={styles.variables__row}>
          <div className={styles.variables__item}></div>
          <div className={styles.variables__add} onClick={handleAdd}>
            {dict.add}
          </div>
        </div>
      </div>
    </div>
  );
}
