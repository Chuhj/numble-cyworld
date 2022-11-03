import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

function NavBar() {
  const router = useRouter();
  const current = router.pathname.slice(1).split('/')[0];

  return (
    <nav className={styles['nav-container']}>
      <ul>
        <li>
          <Link href="/">
            <a className={`${styles['nav-item']} ${current || styles.selected}`}>홈</a>
          </Link>
        </li>
        <li>
          <Link href="/game">
            <a className={`${styles['nav-item']} ${current === 'game' && styles.selected}`}>게임</a>
          </Link>
        </li>
        <li>
          <Link href="/diary">
            <a className={`${styles['nav-item']} ${current === 'diary' && styles.selected}`}>
              다이어리
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
