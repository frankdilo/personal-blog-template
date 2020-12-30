require("dotenv").config();
import fs from "fs";
import { getAllPosts } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

const blogPostsRssXml = async (blogPosts) => {
  let latestPostDate = "";
  let rssItemsXml = "";

  for (let index = 0; index < blogPosts.length; index++) {
    const post = blogPosts[index];
    const postDate = Date.parse(post.date);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }
    rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>${process.env.SITE_ROOT_URL}/${post.slug}</link>
        
        <pubDate>${post.date}</pubDate>
        <description>
        <![CDATA[${await markdownToHtml(post.content)}]]>
        </description>
    </item>`;
  }

  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = async (blogPosts) => {
  const { rssItemsXml, latestPostDate } = await blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>Francesco Di Lorenzo</title>
        <link>${process.env.SITE_ROOT_URL}</link>
        <description>${process.env.RSS_FEED_DESCRIPTION}</description>
        <language>${process.env.RSS_FEED_LANGUAGE || "en"}</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

export const genRSS = async () => {
  const posts = getAllPosts({
    fields: ["slug", "title", "date", "content"],
    limit: 10,
  });
  const xml = await getRssXml(posts);
  fs.writeFileSync("public/rss.xml", xml);
};
