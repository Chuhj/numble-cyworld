import Image from 'next/image';
import styles from './index.module.scss';

function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles['profile-img']}>
          <Image src="/images/profile.png" alt="profile" layout="fill" />
        </div>
        <div className={styles.line}></div>
        <div className={styles.info}>
          <div>
            <Image src="/images/name.svg" alt="name" width={12} height={12} />
            <span>이름</span>
          </div>
          <div>
            <Image src="/images/phone.svg" alt="name" width={12} height={12} />
            <span>phone</span>
          </div>
          <div>
            <Image src="/images/email.svg" alt="name" width={12} height={12} />
            <span>e-mail</span>
          </div>
          <div>
            <Image src="/images/instagram.svg" alt="name" width={12} height={12} />
            <span>인스타그램</span>{' '}
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
