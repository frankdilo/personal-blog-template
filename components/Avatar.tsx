import ExternalLink from "./ExternalLink";

interface Props {
  size?: string;
  className?: string;
}

const Avatar = ({ size = "100", className }: Props) => {
  return (
    <ExternalLink href={process.env.NEXT_PUBLIC_SOCIAL_URL}>
      <img
        width={size}
        height={size}
        src="/avatar-256.png"
        className={className}
        style={{
          display: "block",
          borderRadius: parseInt(size) / 2,
        }}
      />
    </ExternalLink>
  );
};

export default Avatar;
