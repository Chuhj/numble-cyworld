import { gql } from '@apollo/client';
import client from '../src/apollo-client';
import Home from '../src/components/Home';

export interface HomeDiariesData {
  diaries: { number: number; title: string }[];
}

const GET_HOME_DIARIES = gql`
  query FetchBoards($page: Int = 1) {
    diaries: fetchBoards(page: $page) {
      number
      title
    }
  }
`;

function HomePage({ diaries }: HomeDiariesData) {
  return <Home diaries={diaries} />;
}

export async function getStaticProps() {
  const { data } = await client.query<HomeDiariesData>({
    query: GET_HOME_DIARIES,
  });

  return {
    props: {
      diaries: data.diaries.slice(0, 4),
    },
  };
}

export default HomePage;
