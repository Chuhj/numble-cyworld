import DiaryDetail from '../../../src/components/DiaryDetail';

function DiaryDetailPage() {
  return <DiaryDetail />;
}

// export async function getServerSideProps({ params }: GetServerSidePropsContext) {
//   const number = params?.number || '';

//   const { data, error } = await client.query<DiaryData>({
//     query: GET_DIARY,
//     variables: { number: Number(number) },
//   });

//   console.log(data, 'datatatata');

//   if (error || !data || !number) return { props: { diary: null } };
//   return { props: { diary: data.diary } };
// }

// export async function getStaticPaths() {
//   const { data } = await client.query<{ diariesCount: number }>({
//     query: GET_DIARIES_COUNT,
//   });

//   const pages = Math.ceil(data.diariesCount / 10);
//   console.log(pages);

//   const paths: { params: { number: string } }[] = [];
//   for (let i = 1; i <= pages; i++) {
//     const { data } = await client.query<{ diaries: { number: number }[] }>({
//       query: GET_DIARIES_NUMBER,
//       variables: { page: i },
//     });

//     paths.push(
//       ...data.diaries.map((diary) => ({
//         params: { number: String(diary.number) },
//       })),
//     );
//   }

//   return { paths, fallback: true };
// }

// export async function getStaticProps({ params }: GetStaticPropsContext) {
//   const number = params?.number || '';
//   console.log('number', number);

//   const { data, error } = await client.query<DiaryData>({
//     query: GET_DIARY,
//     variables: { number: Number(number) },
//   });

//   if (!data?.diary || error) return { props: { diary: null } };
//   return { props: { diary: data.diary } };
// }

export default DiaryDetailPage;
