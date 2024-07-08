import Head from "next/head";
import styles from "../../../styles/components.module.css";
import { roboto } from "../../../components/font";
import { cx } from "../../../components/cx";
import CsrTime from "@/components/CsrTime";
import { GetServerSideProps, InferGetStaticPropsType } from "next";
import { Match, em } from "@/services/em";
import SsrTime from "@/components/SsrTime";
import { getTime } from "../../api/time";

export const getServerSideProps = (async (req) => {
  const groupId = req.params?.group;
  const matchId = req.params?.match;
  if (
    !groupId ||
    typeof groupId !== "string" ||
    !matchId ||
    typeof matchId !== "string"
  ) {
    return {
      notFound: true,
    };
  }
  const matches = await em.getMatchData(Number(groupId));
  const groups = await em.getAvailableGroups();
  const group = groups.find((g) => g.groupOrderID === Number(groupId));
  const match = matches.find((m) => m.matchID === Number(matchId));
  if (!group || !match) {
    return {
      notFound: true,
    };
  }
  const time = getTime();

  return {
    props: {
      match,
      time,
      groupName: group.groupName,
    },
  };
}) satisfies GetServerSideProps<{
  match: Match;
  time: string;
  groupName: string;
}>;

export default function Home({
  match,
  time,
  groupName,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
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
            <h2
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
            </h2>
            {match.goals
              .sort((a, b) => a.matchMinute! - b.matchMinute!)
              .map((goal) => {
                return (
                  <div key={goal.goalID}>
                    <h3
                      style={{
                        display: "inline-flex",
                        gap: "var(--space-3)",
                        alignItems: "start",
                      }}
                    >
                      {goal.goalGetterName} {goal.scoreTeam1}:{goal.scoreTeam2}
                    </h3>
                    <p>Minute {goal.matchMinute}</p>
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    </>
  );
}
