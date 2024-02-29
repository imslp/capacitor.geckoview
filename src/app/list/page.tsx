import classNames from 'classnames';
import styles from './list.module.css'
import Home from '@/components/home/home';
import { faker } from '@faker-js/faker';
import Listen from '@/components/svgs/Listen';
import Preview from '@/components/svgs/Preview';
import More from '@/components/svgs/More';
import Banner from '@/components/banner/banner';

type Option = 'view' | 'listen' | 'more'
type Work = {
    composer: string,
    title: string,
    options: Option[]
}

export default function List() {
    const items = 1500;
    const works: Work[] = [];
    const allOptions: Option[] = ['view', 'listen', 'more'];
    for (let i = 0; i < items; i++) {
        works.push(
            {
                composer: faker.person.fullName(),
                title: faker.music.songName(),
                options: allOptions.slice(0, faker.number.int() % 3 + 1)
            }
        )
    }
    return (
        <main className={styles.main}>
            <Banner>
                <h1 className={"title"}>
                    {"Sharing the world's public domain music"}
                </h1>
            </Banner>
            <Home />
            <div className={styles.list}>
                {
                    works.map((work, key) => (
                        <ListItem work={work} key={key} />
                    ))
                }
            </div>
        </main>
    )
}

function ListItem({ work, bold }: { work: Work, bold?: boolean }) {
    return (
        <div className={classNames(styles.item, { [styles.bold]: bold })}>
            <div className={styles.work}>
                <span className={styles.song}>{work.title}</span>
                <span className={styles.composer}>{work.composer}</span>
            </div>
            <div className={styles.options}>
                {work.options.map((option, key) => (
                    <Action action={option} key={key} />
                ))}
            </div>
        </div>
    )
}

function Action({ action }: { action: Option }) {
    switch (action) {
        case 'view':
            return <Preview className={styles.icon} />;
        case 'listen':
            return <Listen className={styles.icon} />;
        case 'more':
            return <More className={styles.icon} />;
    }
}