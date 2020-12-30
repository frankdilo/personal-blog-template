import Link from "next/link";
import { Fragment } from "react";
import { formatDate, formatDateRelative } from "../lib/formatDate";
import { PostType } from "../lib/types";
import StyledLink from "./StyledLink";

type Props = {
  posts: PostType[];
};

const PostsList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return <p>There are no posts here.</p>;
  }

  return (
    <div className="mt-8 md:mt-16 md:w-3/4 mx-auto">
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <h2 className="text-lg font-medium mt-4">
                <Link href={`/${post.slug}`}>
                  <a className="no-underline text-blue-600 dark:text-blue-500">
                    {post.title}
                  </a>
                </Link>
              </h2>
              <p
                className="text-gray-400 dark:text-gray-600 text-sm"
                title={formatDate(post.date)}
              >
                {formatDateRelative(post.date)} ago
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostsList;
