const VirtuosoLeafDivider = ({ className }) => {
  return (
    <svg width="100" height="12" className={className}>
      <path
        d="
        m 0 5
        h 43
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <path
        d="
        m 57 5
        h 43
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <path
        d="
        m 10 0
        l 5 5
        l -5 5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <path
        d="
        m 20 0
        l 5 5
        l -5 5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <path
        d="
        m 30 0
        l 5 5
        l -5 5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <path
        d="
        m 70 0
        l -5 5
        l 5 5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <path
        d="
        m 80 0
        l -5 5
        l 5 5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <path
        d="
        m 90 0
        l -5 5
        l 5 5
        "
        fill="transparent"
        stroke="var(--colour-white)"
        strokeWidth={1}
        // shapeRendering="optimizeSpeed"
      />
      <circle cx={50} cy={5} r={4} fill="var(--colour-white)" />
    </svg>
  );
};

export default VirtuosoLeafDivider;
