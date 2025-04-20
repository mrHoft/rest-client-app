import Link from 'next/link';

import styles from './card.module.css';

type TCardProps = Record<'id' | 'link' | 'name' | 'role' | 'about', string> & { image: string | undefined };

export default function Card({ data }: { data: TCardProps }) {
  return (
    <div className={styles.card}>
      <img className={styles.card__avatar} src={data.image} alt="avatar" />

      <Link scroll={false} className={styles.card__name} href={data.link}>
        {data.name}
      </Link>
      <div>{data.role}</div>
      <div>{data.about}</div>
    </div>
  );
}
