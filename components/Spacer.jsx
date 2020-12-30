const Spacer = ({ size = 4 }) => {
  return (
    <>
      <div />
      <style jsx>{`
        display: block;
        height: ${size * 0.25}rem;
      `}</style>
    </>
  );
};

export default Spacer;
