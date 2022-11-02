import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import styles from './index.module.scss';

export interface DiariesData {
  diaries: { number: number; title: string; createdAt: string }[];
}

export const GET_DIARIES = gql`
  query FetchBoards($page: Int = 1) {
    diaries: fetchBoards(page: $page) {
      number
      title
      createdAt
    }
  }
`;
function DiarySection() {
  const { data, loading, error } = useQuery<DiariesData>(GET_DIARIES);

  const diaries = data?.diaries.slice(0, 5);
  return (
    <>
      <div className={styles.titleContainer}>
        <div>
          <span className={styles.title}>Diary</span>
          <span className={styles.subtitle}>TODAY STORY</span>
        </div>
        <button className={styles.writeBtn}>
          <Link href="/diary/new">다이어리 작성</Link>
        </button>
      </div>
      <div className={styles.line}></div>
      <ul className={styles['post-container']}>
        {error && <>Error!</>}
        {loading && !data ? <>Loading...</> : null}
        {diaries &&
          diaries.map((diary) => (
            <li key={diary.number} className={styles.post}>
              <div className={styles['post-info']}>
                <span className={styles.badge}>{diary.createdAt.split('T')[0]}</span>
                <span>{diary.title}</span>
              </div>
              <span className={styles.link}>
                <Link href={`/diary/${diary.number}`}>자세히 보러 가기 &gt;</Link>
              </span>
            </li>
          ))}
      </ul>
    </>
  );
}

export default DiarySection;
