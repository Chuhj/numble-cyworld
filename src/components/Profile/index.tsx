import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import styles from './index.module.scss';

interface Profile {
  name: string;
  age: number;
  school: string;
}

interface ProfileData {
  fetchProfile: Profile;
}

interface ProfileVars {
  name: string;
}

const GET_PROFILE = gql`
  query FetchProfile($name: String!) {
    fetchProfile(name: $name) {
      name
      age
      school
    }
  }
`;

function Profile() {
  const { data, error } = useQuery<ProfileData, ProfileVars>(GET_PROFILE, {
    variables: { name: '김헨리' },
  });

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles['profile-img']}>
          <Image src="/images/profile.png" alt="profile" layout="fill" />
        </div>
        <div className={styles.line}></div>
        {error ? 'ERROR!' : null}
        <div className={styles.info}>
          <div>
            <Image src="/images/name.svg" alt="name" width={12} height={12} />
            <span>{data && `${data.fetchProfile?.name} (${data.fetchProfile.age})`}</span>
          </div>
          <div>
            <Image src="/images/instagram.svg" alt="school" width={12} height={12} />
            <span>{data && data.fetchProfile?.school}</span>{' '}
          </div>
        </div>
      </div>
      <div className={styles['todays-feeling']}>
        <span className={styles.text}>오늘의 기분</span>
        <select className={styles.select}>
          <option value="">기쁨 😊</option>
        </select>
      </div>
    </div>
  );
}

export default Profile;
