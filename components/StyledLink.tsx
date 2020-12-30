import Link from "next/link";
import { FC } from "react";

interface StyledLinkProps {
  href: string;
  as?: string;
}

const StyledLink: FC<StyledLinkProps> = (props) => {
  return (
    <Link href={props.href} as={props.as} passHref>
      <a>{props.children}</a>
    </Link>
  );
};

export default StyledLink;
