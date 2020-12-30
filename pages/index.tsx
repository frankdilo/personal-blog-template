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
            src={process.env.NEXT_PUBLIC_AVATAR_URL || "/media/avatar.png"}
            style={{
              display: "block",
              borderRadius: 60,
            }}
          />
        </ExternalLink>
        <h1 className="text-3xl font-bold mt-3 dark:text-gray-200">
          {process.env.NEXT_PUBLIC_HOME_TITLE}
        </h1>{" "}
        <p
          className="index_subheader mt-2 text-xl text-gray-600 dark:text-gray-400 text-center"
          dangerouslySetInnerHTML={{
            __html: process.env.NEXT_PUBLIC_HOME_SUBTITLE,
          }}
        ></p>
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
