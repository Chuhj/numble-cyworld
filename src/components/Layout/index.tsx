import Image from 'next/image';
import React from 'react';
import styles from './index.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={styles.container}>
        <Image src="/images/background.png" alt="background" layout="fill" objectFit="cover" />
        <div className={styles.innerBox}>
          <div className={styles.children}>{children}</div>
          <Image src="/images/inner-box.png" alt="inner-box" layout="fill" objectFit="cover" />
        </div>
      </div>
    </>
  );
}

export default Layout;
