import Head from "next/head";
import styles from "../../styles/components.module.css";
import { roboto } from "../../components/font";
import { cx } from "../../components/cx";
import CsrTime from "@/components/CsrTime";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Match, em } from "@/services/em";
import SsrTime from "@/components/SsrTime";
import { getTime } from "../api/time";
import Link from "next/link";

export const getStaticProps = (async (req) => {
  const groupId = req.params?.group;
  if (!groupId || typeof groupId !== "string") {
    return {
      notFound: true,
    };
  }
  const matches = await em.getMatchData(Number(groupId));
  const groups = await em.getAvailableGroups();
  const group = groups.find((g) => g.groupOrderID === Number(groupId));
  if (!group) {
    return {
      notFound: true,
    };
  }
  const time = getTime();

  return {
    props: {
      matches,
      time,
      groupName: group.groupName,
      groupId: Number(groupId),
    },
  };
}) satisfies GetStaticProps<{
  matches: Match[];
  time: string;
  groupName: string;
  groupId: number;
}>;

export const getStaticPaths = async () => {
  const groups = await em.getAvailableGroups();
  return {
    paths: groups.map((group) => ({
      params: { group: group.groupOrderID.toString() },
    })),
    fallback: false,
  };
};

export default function Home({
  matches,
  time,
  groupName,
  groupId,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
          <SsrTime time={time} />
          <div className={cx(styles.box, styles.gap)}>
            <h2>Matches aus {groupName}</h2>
            {matches.map((match) => {
              return (
                <div key={match.matchID}>
                  <h3
                    style={{
                      display: "inline-flex",
                      gap: "var(--space-3)",
                      alignItems: "start",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={match.team1.teamIconUrl}
                      alt="team logo"
                      style={{ height: "1em" }}
                    />{" "}
                    {match.team1.teamName} vs
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={match.team2.teamIconUrl}
                      alt="team logo"
                      style={{ height: "1em" }}
                    />{" "}
                    {match.team2.teamName}
                  </h3>
                  <p>
                    In {match.location?.locationCity} mit{" "}
                    {match.numberOfViewers} Zuschauern
                  </p>
                  <Link href={`/group/${groupId}/${match.matchID}`}>
                    Details
                  </Link>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
