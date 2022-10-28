import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

const MAX_NUM = 45;

function GameLotto() {
  const [numbers, setNumbers] = useState<number[]>([3, 5, 10, 24, 30, 34]);

  const getLottoNumbers = () => {
    return new Array(numbers.length).fill(0).map(() => Math.ceil(Math.random() * MAX_NUM));
  };

  const onClickButton = () => {
    setNumbers(getLottoNumbers());
  };

  return (
    <div className={styles['card-lotto']}>
      {/* 로또 */}
      <Image src="/lotto.svg" alt="balls" height={20} width={40}></Image>
      <span className={styles['game-name']}>LOTTO</span>
      <span className={styles['game-detail']}>버튼을 누르세요</span>
      <ul className={styles['lotto-numbers']}>
        {numbers.map((number, i) => (
          <li key={i} className={styles['lotto-number']}>
            {number}
          </li>
        ))}
      </ul>
      <button onClick={onClickButton}>Button</button>
    </div>
  );
}

export default GameLotto;
