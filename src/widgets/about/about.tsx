import Link from 'next/link';
import { useMemo } from 'react';
import Card from '~/components/card/card';

import styles from './about.module.css';

export default function About({ dict }: { dict: Record<string, string> }) {
  const teamMembers = useMemo(
    () => [
      {
        id: '#01',
        image: 'https://avatars.githubusercontent.com/u/62406462?v=4',
        link: 'https://github.com/Unf0rgettab1e',
        name: dict.Tony,
        role: dict.roleDeveloper,
        about: dict.aboutTony,
      },
      {
        id: '#02',
        image: 'https://avatars.githubusercontent.com/u/51874769?v=4',
        link: 'https://github.com/mrHoft',
        name: dict.Hoft,
        role: dict.roleLeader,
        about: dict.aboutHoft,
      },
      {
        id: '#03',
        image: 'https://avatars.githubusercontent.com/u/79003953?v=4',
        link: 'https://github.com/EugeniaRe',
        name: dict.Eugeniya,
        role: dict.roleDeveloper,
        about: dict.aboutEugeniya,
      },
    ],
    [dict]
  );

  return (
    <div className={styles.about}>
      <h3 className={styles.about__title}>{dict.aboutProject}</h3>
      <p>{dict.projectDescription}</p>
      <h3 className={styles.about__title}>{dict.aboutTeam}</h3>
      <div className={styles.about__team}>
        {teamMembers.map(member => (
          <Card key={member.id} data={member} />
        ))}
      </div>
      <h3 className={styles.about__title}>RS School</h3>
      <div>
        <div className={styles.about__course}>
          <Link scroll={false} className={styles.about__course_link} href="https://rs.school/courses/reactjs">
            <img
              className={styles.about__course_logo}
              src="https://rs.school/_next/static/media/react.5b830964.svg"
              alt="course_logo"
            />
            React Course
          </Link>
        </div>
        <div className={styles.about__course_description}>{dict.aboutCourse}</div>
      </div>
    </div>
  );
}
