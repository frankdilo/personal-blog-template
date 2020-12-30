import ExternalLink from "../components/ExternalLink";
import Page from "../components/layouts/Page";
import PostsList from "../components/PostsList";
import { getAllPosts } from "../lib/api";
import { PostType } from "../lib/types";
import { genRSS } from "../scripts/genRSS";

type Props = {
  posts: PostType[];
};

export default function Home({ posts }: Props) {
  return (
    <Page title="Francesco Di Lorenzo">
      <div className="flex flex-col items-center text-xl">
        <ExternalLink href="https://twitter.com/frankdilo">
          <img
            width="100px"
            height="100px"
            src="/avatar-no-bg-512.png"
            style={{
              display: "block",
              borderRadius: 60,
            }}
          />
        </ExternalLink>
        <h1 className="text-3xl font-bold mt-3 dark:text-gray-200">
          Hey, I am Francesco
        </h1>{" "}
        <p className="mt-2 text-xl text-gray-600 dark:text-gray-400 text-center">
          Programmer & Indie Hacker.
        </p>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mt-1">
          Building{" "}
          <ExternalLink
            href="https://mailbrew.com/"
            className="border-solid border-b-4 border-red-500 dark:border-red-800"
          >
            Mailbrew
          </ExternalLink>{" "}
          in the{" "}
          <ExternalLink
            href="https://twitter.com/frankdilo"
            className="border-solid border-b-4 border-blue-500 dark:border-blue-800"
          >
            open
          </ExternalLink>
          .
        </p>
      </div>
      <PostsList posts={posts} />
    </Page>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts({ fields: ["title", "date", "slug"] });

  // gen rss feed at build time
  // https://dev.to/riccardobevilacqua/how-to-create-an-rss-feed-in-next-js-10-12la
  await genRSS();

  return {
    props: { posts },
  };
};
