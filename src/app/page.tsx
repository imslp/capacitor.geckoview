"use client";

import Button from "@/components/button/button";
import styles from "./page.module.css";
import Link from "next/link";
import Banner from "@/components/banner/banner";
import { useEffect, useState } from 'react';

export default function Home() {
  const [userAgent, setUserAgent] = useState('');

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

 return (
    <main className={styles.main}>
      <Banner>
        <h1 className={"title"}>
          {"Capacitor GeckoView Demo"}
        </h1>
      </Banner>
      <div className="content">
        <Link href={'/files'} style={{ width: '100%' }}>
          <Button size="extended">
            Files Test
          </Button>
        </Link>
        <Link href={'/database'} style={{ width: '100%' }}>
          <Button size="extended">
            SQLite Test
          </Button>
        </Link>
        <Link href={'/list'} style={{ width: '100%' }}>
          <Button size="extended">
            Long List
          </Button>
        </Link>
        {userAgent}
      </div>
    </main>
  );
}
