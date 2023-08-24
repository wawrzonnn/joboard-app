import React, { PropsWithChildren } from 'react';
import * as styles from './Container.module.scss';

export const Container = ({ children }: PropsWithChildren) => (
   <div className={styles.container}>{children}</div>
);