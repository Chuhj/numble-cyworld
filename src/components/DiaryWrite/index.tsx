import React, { useState } from 'react';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { GET_DIARIES, DiariesData } from '../DiarySection';

interface WriteDiaryVars {
  writer: string;
  title: string;
  contents: string;
}

interface WriteDiaryResponse {
  writeDiaryResponse: {
    number: number;
    message: string;
  };
}

const WRITE_DIARY = gql`
  mutation CreateBoard($writer: String!, $title: String!, $contents: String!) {
    writeDiaryResponse: createBoard(writer: $writer, title: $title, contents: $contents) {
      number
      message
    }
  }
`;

const writer = '소고기';
function DiaryWrite() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [writeDiary] = useMutation<WriteDiaryResponse, WriteDiaryVars>(WRITE_DIARY, {
    update: (cache, { data }) => {
      const queryData = cache.readQuery<DiariesData>({ query: GET_DIARIES });
      const localDiaries = queryData?.diaries || [];

      const newNumber = data?.writeDiaryResponse?.number;
      const newDiary = { writer, title, createdAt: new Date().toISOString(), number: newNumber };

      if (localDiaries.some(({ number }) => number === newNumber)) return;
      cache.writeQuery({ query: GET_DIARIES, data: { diaries: [newDiary, ...localDiaries] } });
    },
  });

  const handleMutationCompleted = (data: WriteDiaryResponse) => {
    const number = data?.writeDiaryResponse?.number;
    alert(data?.writeDiaryResponse?.message);
    router.replace(`/diary/${number}`);
  };

  const handleMutationError = (error: ApolloError) => {
    alert(error.message);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    if (!contents) {
      alert('내용을 입력해주세요');
      return;
    }
    writeDiary({
      variables: { writer, title, contents },
      onCompleted: handleMutationCompleted,
      onError: handleMutationError,
    });
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <div>
          <span className={styles.title}>Diary | 글 등록</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <input
            type="text"
            className={styles.text}
            placeholder="제목을 입력해주세요"
            onChange={handleChangeTitle}
          />
          <textarea
            className={styles.textarea}
            placeholder="본문을 입력해주세요"
            onChange={handleChangeContents}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit">등록하기</button>
          <button type="button" onClick={() => router.back()}>
            취소하기
          </button>
        </div>
      </form>
    </>
  );
}

export default DiaryWrite;
