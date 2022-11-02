import styles from './index.module.scss';
import { HomeDiariesData } from '../../../pages/index';
import Link from 'next/link';

function Home({ diaries }: HomeDiariesData) {
  const songList = [
    { number: 1, name: '눈의 꽃', artist: '박효신' },
    { number: 2, name: '사랑스러워', artist: '김종국' },
    { number: 3, name: '내사람: Partner For Life', artist: 'SG 워너비' },
    { number: 4, name: 'Love Love Love', artist: '에픽하이' },
    { number: 5, name: '애인...있어요', artist: '백지영' },
    { number: 6, name: '눈의 꽃', artist: '박효신' },
    { number: 7, name: '사랑스러워', artist: '김종국' },
    { number: 8, name: '내사람: Partner For Life', artist: 'SG 워너비' },
    { number: 9, name: 'Love Love Love', artist: '에픽하이' },
    { number: 10, name: '애인...있어요', artist: '백지영' },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={styles.news}>
          <span className={styles.title}>Updated news</span>
          <div className={styles.line}></div>
          <ul>
            {diaries &&
              diaries.map((diary) => (
                <li key={diary.number} className={styles.item}>
                  <div className={styles.badge}>다이어리</div>
                  <Link href={`/diary/${diary.number}`}>
                    <span className={styles['diary-title']}>{diary.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.status}>
          <div className={styles.row}>
            <div className={styles.col}>
              <span>다이어리</span>
              <span>0/65</span>
            </div>
            <div className={styles.col}>
              <span>사진첩</span>
              <span>0/265</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <span>게시판</span>
              <span>0/15</span>
            </div>
            <div className={styles.col}>
              <span>방명록</span>
              <span>0/15</span>
            </div>
          </div>
          <div className={styles.row}></div>
        </div>
      </div>
      <div className={styles.bgm}>
        {/** height 고정시켜놓고 flex column으로 밑으로 붙인다음
         * bottom에 margin or padding
         */}
        <div className={styles.titleContainer}>
          <span className={styles.title}>추억의 BGM</span>
          <span className={styles.subtitle}>TODAY CHOICE</span>
        </div>
        <div>
          <div className={styles.category}>
            <input type="checkbox" className={styles['category-detail']} />
            <div className={styles['category-detail']}>번호</div>
            <div className={styles['category-detail']}>곡명</div>
            <div className={styles['category-detail']}>아티스트</div>
          </div>
          <ol className={styles['song-list']}>
            {songList.map(({ number, name, artist }) => (
              <li key={number} className={styles['song-item']}>
                <input type="checkbox" className={styles['song-detail']} />
                <div className={styles['song-detail']}>{number}</div>
                <div className={styles['song-detail']}>{name}</div>
                <div className={styles['song-detail']}>{artist}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Home;
