import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Container = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Container;
