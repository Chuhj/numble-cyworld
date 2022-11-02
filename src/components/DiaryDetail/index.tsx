import Link from 'next/link';
import styles from './index.module.scss';
import { DiaryData } from '../../../pages/diary/[number]';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_DIARIES, DiariesData } from '../DiarySection';

interface DeleteDiaryVars {
  number: number;
}

interface DeleteDiaryResponse {
  deleteDiaryResponse: {
    message: string;
    number: number;
  };
}

const DELETE_DIARY = gql`
  mutation DeleteBoard($number: Int!) {
    deleteDiaryResponse: deleteBoard(number: $number) {
      message
      number
    }
  }
`;

function DiaryDetail({ diary }: DiaryData) {
  const router = useRouter();
  const { number } = router.query || '';

  const [deleteDiary] = useMutation<DeleteDiaryResponse, DeleteDiaryVars>(DELETE_DIARY, {
    variables: { number: Number(number) },
    update: (cache, { data }) => {
      const queryData = cache.readQuery<DiariesData>({ query: GET_DIARIES });
      const localDiaries = queryData?.diaries;

      const deletedNumber = data?.deleteDiaryResponse?.number;
      const newDiaries = localDiaries?.filter((diary) => diary.number !== deletedNumber);

      cache.writeQuery({ query: GET_DIARIES, data: { diaries: newDiaries } });
    },
  });

  const handleClickDelete = () => {
    if (!number) return;

    deleteDiary({
      onCompleted: (data) => {
        alert(data?.deleteDiaryResponse?.message);
        router.replace('/diary');
      },
      onError: (error) => alert(error.message),
    });
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <div>
          <span className={styles.title}>Diary</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles['diary-container']}>
        <div className={styles.diary}>
          <div className={styles['diary-header']}>
            <span className={styles.date}>{diary && diary.createdAt.split('T')[0]}</span>
            <span className={styles.writer}>{diary && diary.writer}</span>
          </div>
          <h4 className={styles['diary-title']}>제목: {diary.title}</h4>
          <p className={styles.contents}>{diary && diary.contents}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button>
          <Link href={`/diary/${number}/edit`}>수정하기</Link>
        </button>
        <button onClick={handleClickDelete}>삭제하기</button>
      </div>
      <span className={styles.link}>
        <Link href="/diary">&lt; 다이어리 리스트 바로가기</Link>{' '}
      </span>
    </>
  );
}

export default DiaryDetail;
