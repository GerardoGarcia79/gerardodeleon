const PrimaryButton = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick?: () => void;
}) => {
  return (
    <button
      type="button"
      className="btn-primary h-11 px-5"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export { PrimaryButton };
