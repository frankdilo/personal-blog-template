import { ReactNode } from "react";
import Head from "next/head";

type Props = {
  title: string;
  children?: ReactNode;
  noIndex?: boolean;
  rssLink?: boolean;
};

const Page = ({ title, children, noIndex, rssLink }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {noIndex && <meta name="robots" content="noindex"></meta>}
        {rssLink && (
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Francesco Di Lorenzo"
            href="https://francescodilorenzo.com/rss"
          />
        )}
      </Head>
      <div className="px-4 py-8 lg:py-32 lg:px-0 max-w-screen-sm mx-auto">
        {children}
      </div>
    </>
  );
};

export default Page;
