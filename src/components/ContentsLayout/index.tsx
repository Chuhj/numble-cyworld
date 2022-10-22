import styles from './index.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

function ContentsLayout({ children }: LayoutProps) {
  return <div className={styles.container}>{children}</div>;
}

export default ContentsLayout;
