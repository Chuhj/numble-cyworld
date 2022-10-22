import Profile from '../Profile';
import ContentsLayout from '../ContentsLayout';
import Home from '../Home';
import styles from './index.module.scss';

function Main() {
  return (
    <main className={styles.main}>
      <Profile />
      <ContentsLayout>
        <Home />
      </ContentsLayout>
    </main>
  );
}

export default Main;
