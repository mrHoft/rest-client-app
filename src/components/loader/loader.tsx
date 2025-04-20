'use client';

import React from 'react';

import styles from './loader.module.css';

interface LoaderComponent {
  show: () => void;
  hide: () => void;
  (): React.ReactNode;
}
type TVisibleSetter = React.Dispatch<React.SetStateAction<boolean>>;

export const Loader: LoaderComponent = (() => {
  const holder: {
    setVisible: TVisibleSetter | null;
    register: (setter: TVisibleSetter) => void;
  } = { setVisible: null, register: (setter: TVisibleSetter) => (holder.setVisible = setter) };

  const Container = () => {
    const [visible, setVisible] = React.useState(false);
    holder.register(setVisible);

    return visible ? (
      <div className={styles.loader}>
        <div className={styles.loader__spinner} />
      </div>
    ) : null;
  };

  Container.show = () => {
    if (holder.setVisible) holder.setVisible(true);
  };

  Container.hide = () => {
    if (holder.setVisible) holder.setVisible(false);
  };

  return Container;
})();
