import Link from 'next/link';
import styles from './index.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_DIARIES, DiariesData } from '../DiarySection';
import { useEffect } from 'react';

interface DiaryData {
  diary: {
    writer: string;
    title: string;
    contents: string;
    like: number;
    createdAt: string;
  };
}

interface GetDiaryVars {
  number: number;
}

const GET_DIARY = gql`
  query FetchBoard($number: Int!) {
    diary: fetchBoard(number: $number) {
      writer
      title
      contents
      like
      createdAt
    }
  }
`;

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

function DiaryDetail() {
  const router = useRouter();
  const { number } = router.query || '';

  const { data, loading, error, refetch } = useQuery<DiaryData, GetDiaryVars>(GET_DIARY, {
    variables: { number: Number(number) },
  });
  const diary = data?.diary;

  const [deleteDiary] = useMutation<DeleteDiaryResponse, DeleteDiaryVars>(DELETE_DIARY, {
    variables: { number: Number(number) },
    update: (cache, { data }) => {
      // 삭제를 완료하면 캐시에서 게시물을 삭제
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

  useEffect(() => {
    refetch();
  }, [refetch]);

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
          <h4 className={styles['diary-title']}>제목: {diary && diary.title}</h4>
          {error && 'Error'}
          {!data && loading ? 'Loading...' : null}
          <p className={styles.contents}>{diary && diary.contents}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link
          href={{
            pathname: `/diary/${number}/edit`,
            query: { title: diary?.title, contents: diary?.contents, writer: diary?.writer },
          }}
          as={`/diary/${number}/edit`}
        >
          <button>수정하기</button>
        </Link>
        <button onClick={handleClickDelete}>삭제하기</button>
      </div>
      <span className={styles.link}>
        <Link href="/diary">&lt; 다이어리 리스트 바로가기</Link>{' '}
      </span>
    </>
  );
}

export default DiaryDetail;
