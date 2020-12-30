import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

const ExternalLink = ({ href, children, className }: Props) => {
  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children}
    </a>
  );
};

export default ExternalLink;
