import { gql } from '@apollo/client';
import client from '../src/apollo-client';
import Home from '../src/components/Home';

export interface HomeDiariesData {
  diaries: { number: number; title: string }[];
  error: string | null;
}

const GET_HOME_DIARIES = gql`
  query FetchBoards($page: Int = 1) {
    diaries: fetchBoards(page: $page) {
      number
      title
    }
  }
`;

function HomePage({ diaries, error }: HomeDiariesData) {
  return <Home diaries={diaries} error={error} />;
}

export async function getServerSideProps() {
  const { data, error } = await client.query<HomeDiariesData>({
    query: GET_HOME_DIARIES,
    fetchPolicy: 'network-only',
  });
  const diaries = data?.diaries.slice(0, 4);

  if (error) {
    return {
      props: {
        diaries: [],
        error: error.message,
      },
    };
  }

  return {
    props: {
      diaries,
      error: null,
    },
  };
}

export default HomePage;
