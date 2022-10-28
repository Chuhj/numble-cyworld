import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

function GameEndtalk() {
  const [prevWord, setPrevWord] = useState('코드캠프');
  const [word, setWord] = useState('');
  const [result, setResult] = useState('결과!');

  const onChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const handleSubmitEndtalk = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prevWord[prevWord.length - 1] === word[0]) {
      setWord('');
      setResult('정답입니다!');
      setPrevWord(word);
    } else {
      setWord('');
      setResult('오답입니다!');
    }
  };

  return (
    <div className={styles['card-endtalk']}>
      {/* 끝말잇기 */}
      <Image src="/endtalk.svg" alt="train" height={20} width={40}></Image>
      <span className={styles['game-name']}>끝말잇기</span>
      <span className={styles['game-detail']}>제시어: {prevWord}</span>
      <form className={styles.form} onSubmit={handleSubmitEndtalk}>
        <input type="text" placeholder="단어를 입력하세요." value={word} onChange={onChangeWord} />
        <button type="submit">입력</button>
      </form>
      <span className={styles.result}>{result}</span>
    </div>
  );
}

export default GameEndtalk;
