import React, { useState } from 'react';
// @ts-ignore
import styles from './react-example.module.scss';
import cn from 'classnames';
import reactLogo from './react.svg';

// export type ReactExampleAppProps = {
//   text?: string
// }

export function ReactExampleApp({text = "This is a single spa example app"}){ //}: ReactExampleAppProps ) {
  const [isRotating, setIsRotating] = useState(true);
  return (
    <div className={styles.app}>
      <img
        src={reactLogo}
        className={cn(styles.logo, isRotating ? styles.rotating : null)}
        onClick={() => setIsRotating(!isRotating)}
      />
      <div className={styles.hello}>{text}</div>
    </div>
  );
}
