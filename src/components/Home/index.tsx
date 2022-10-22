import styles from './index.module.scss';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={styles.news}>
          <span className={styles.title}>Updated news</span>
          <div className={styles.line}></div>
          <ul>
            <li className={styles.item}>
              <div className={styles.badge}>다이어리</div>
              <span className={styles['diary-title']}>다이어리 제목1</span>
            </li>
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
          <div></div>
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
            <li className={styles['song-item']}>
              <input type="checkbox" className={styles['song-detail']} />
              <div className={styles['song-detail']}>1</div>
              <div className={styles['song-detail']}>눈의 꽃</div>
              <div className={styles['song-detail']}>박효신</div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Home;
