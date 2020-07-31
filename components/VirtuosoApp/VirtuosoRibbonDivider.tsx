type Props = {
  className?: string;
};

const VirtuosoRibbonDivider = ({ className }: Props) => {
  return (
    <svg width="100" height="12" className={className}>
      <path
        d="
        m 10,6
        a 3,2 0 0,0 0,5
        h 20 v -5 h 10 v -5 h 20 v 5 h 10 v 5 h 20
        a 3,2 0 0,0 0,-5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      ></path>
    </svg>
  );
};

export default VirtuosoRibbonDivider;
