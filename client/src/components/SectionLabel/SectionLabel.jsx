const SectionLabel = ({ children, ...rest }) => {
  return (
    <div className="label" {...rest}>
      {children}
    </div>
  );
};

export default SectionLabel;
