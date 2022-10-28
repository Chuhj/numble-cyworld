import GameEndtalk from '../GameEndtalk';
import GameLotto from '../GameLotto';
import styles from './index.module.scss';

function Game() {
  return (
    <>
      <div className={styles.titleContainer}>
        <span className={styles.title}>GAME</span>
        <span className={styles.subtitle}>TODAY CHOICE</span>
      </div>
      <div className={styles.line}></div>
      <div className={styles['game-section']}>
        <GameEndtalk />
        <GameLotto />
      </div>
    </>
  );
}

export default Game;
