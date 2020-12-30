import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { PostType } from "./types";

const postsDirectory = join(process.cwd(), "_content");

export function getPostSlugs() {
  let res = fs.readdirSync(postsDirectory);
  // only include markdown files
  res = res.filter((filePath) => filePath.match(/\.md$/));
  return res;
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

type Options = {
  fields?: string[];
  justDrafts?: boolean;
  limit?: number;
};

export function getAllPosts(options: Options) {
  const defaultOptions = { fields: [], justDrafts: false };
  const theOptions = { ...defaultOptions, ...options };

  // the draft feed is needed for filtering
  if (!theOptions.fields.includes("draft")) {
    theOptions.fields.push("draft");
  }

  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, theOptions.fields))
    .filter((post) => (theOptions.justDrafts ? post.draft : !post.draft))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .slice(0, theOptions.limit ?? slugs.length);

  return posts;
}
