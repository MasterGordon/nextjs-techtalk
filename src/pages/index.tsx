import Head from "next/head";
import styles from "../styles/components.module.css";
import { roboto } from "../components/font";
import { cx } from "../components/cx";
import CsrTime from "@/components/CsrTime";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Group, em } from "@/services/em";
import Image from "next/image";
import ski from "../images/ski.jpg";
import SsrTime from "@/components/SsrTime";
import { getTime } from "./api/time";
import Link from "next/link";

export const getServerSideProps = (async () => {
  const groups = await em.getAvailableGroups();
  const currentGroup = await em.getCurrentGroup();
  const time = getTime();

  return {
    props: {
      groups,
      currentGroup,
      time,
    },
  };
}) satisfies GetServerSideProps<{
  groups: Group[];
  currentGroup: Group;
  time: string;
}>;

export default function Home({
  groups,
  currentGroup,
  time,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>TechTalk - Next.js</title>
        <meta name="description" content="TechTalk - Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainWrapper}>
        <main className={cx(styles.main, roboto.className)}>
          <h1 className={cx(styles.heading, roboto.className)}>TechTalk</h1>
          <CsrTime />
          <SsrTime time={time || "Test"} />
          <div className={cx(styles.box, styles.gap)}>
            <h2>Groups</h2>
            {groups.map((group) => (
              <Link
                href={`/group/${group.groupOrderID}`}
                key={group.groupOrderID}
              >
                {group.groupName}{" "}
                {group.groupOrderID === currentGroup.groupOrderID
                  ? "(current)"
                  : ""}
              </Link>
            ))}
          </div>
          <div
            className={styles.box}
            style={{ position: "relative", height: "50vh" }}
          >
            <Image
              src={ski}
              alt="ski"
              fill={true}
              style={{ objectFit: "contain" }}
              placeholder="blur"
            ></Image>
          </div>
        </main>
      </div>
    </>
  );
}
