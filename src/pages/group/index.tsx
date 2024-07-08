import { GetServerSideProps } from "next";

export const getServerSideProps = (async () => {
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
}) satisfies GetServerSideProps;

export default function GroupIndex() {
  return <></>;
}
