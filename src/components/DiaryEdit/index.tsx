import React, { useEffect, useState } from 'react';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

interface EditDiaryVars {
  number: number;
  writer: string;
  title: string;
  contents: string;
}

interface EditDiaryResponse {
  editDiaryResponse: {
    number: number;
    message: string;
  };
}

const EDIT_DIARY = gql`
  mutation UpdateBoard($number: Int!, $writer: String!, $title: String!, $contents: String!) {
    editDiaryResponse: updateBoard(
      number: $number
      writer: $writer
      title: $title
      contents: $contents
    ) {
      number
      message
    }
  }
`;

function DiaryEdit() {
  const router = useRouter();
  const { title: originTitle, contents: originContents, writer: originWriter } = router.query;
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [editDiary] = useMutation<EditDiaryResponse, EditDiaryVars>(EDIT_DIARY);

  const handleMutationCompleted = (data: EditDiaryResponse) => {
    const number = data?.editDiaryResponse?.number;
    alert(data?.editDiaryResponse?.message);
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
    editDiary({
      variables: {
        number: Number(router.query?.number),
        writer: String(originWriter), // 모든 다이어리를 수정 가능하므로 원래 글쓴이 그대로 씀
        title,
        contents,
      },
      onCompleted: handleMutationCompleted,
      onError: handleMutationError,
    });
  };

  useEffect(() => {
    if (originTitle) setTitle(String(originTitle));
    if (originContents) setContents(String(originContents));
  }, [originTitle, originContents]);

  return (
    <>
      <div className={styles.titleContainer}>
        <div>
          <span className={styles.title}>Diary | 글 수정</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <input
            type="text"
            className={styles.text}
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleChangeTitle}
          />
          <textarea
            className={styles.textarea}
            placeholder="본문을 입력해주세요"
            value={contents}
            onChange={handleChangeContents}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit">수정하기</button>
          <button type="button" onClick={() => router.back()}>
            취소하기
          </button>
        </div>
      </form>
    </>
  );
}

export default DiaryEdit;
