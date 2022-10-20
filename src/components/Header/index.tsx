import styles from './index.module.scss';

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.visitors}>
        <span className={styles.text}>today 0</span>
        <div className={styles['vertical-line']}></div>
        <span className={styles.text}>total 12345</span>
      </div>
      <div className={styles['title-container']}>
        <span className={styles.title}>사이좋은 사람들 싸이월드</span>
        <span className={styles['privacy-setting']}>사생활보호설정▶️</span>
      </div>
    </div>
  );
}

export default Header;
