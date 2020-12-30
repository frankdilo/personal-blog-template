declare module "react" {
  interface HTMLProps<T> extends HTMLAttributes<T>, ClassAttributes<T> {}
}

export type PostType = {
  slug: string;
  title: string;
  date: string;
  content: string;
  draft?: boolean;
};
