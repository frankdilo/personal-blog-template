import Link from "next/link";
import ExternalLink from "../components/ExternalLink";
import Page from "../components/layouts/Page";
import { getAllPosts, getPostBySlug } from "../lib/api";
import { formatDate } from "../lib/formatDate";
import markdownToHtml from "../lib/markdownToHtml";
import { PostType } from "../lib/types";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  return (
    <Page title={post.title}>
      <Link href="/">
        <a className="text-3xl text-gray-600 pb-6 sm:pb-10 font-semibold block">
          ⌘
        </a>
      </Link>

      {post.draft && (
        <p className="bg-yellow-200 p-2 rounded-md mb-4 inline-block text-gray-800">
          <strong>
            This post is a draft.{" "}
            <ExternalLink
              href="https://twitter.com/messages/compose?recipient_id=45604122"
              className="underline text-gray-600"
            >
              DM me for feedback
            </ExternalLink>
            .
          </strong>
        </p>
      )}

      <h1 className="mb-0 dark:text-gray-100 font-bold text-3xl">
        <a className="no-underline" href={`/${post.slug}/`}>
          {post.title}
        </a>
      </h1>
      <p className="text-gray-500 mb-4" style={{ marginTop: "0.5rem" }}>
        {formatDate(post.date)}
      </p>
      <article
        className="prose prose-blue dark:prose-dark prose-sm sm:prose-lg xl:prose-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="text-gray-500 text-center mt-24 flex w-full justify-center">
        <Link href="/">home</Link>
        <ExternalLink href="/rss" className="ml-6">
          /rss
        </ExternalLink>
      </div>
    </Page>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "draft",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts({ fields: ["slug"] });
  const drafts = getAllPosts({ fields: ["slug"], justDrafts: true });

  const allPosts = posts.concat(drafts);

  return {
    paths: allPosts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
