type Props = {
  className?: string;
};

const VirtuosoVertDivider = ({ className }: Props) => {
  return (
    <svg className={className} width={10} height={60}>
      <circle cx={5} cy={4} r={4} fill="var(--colour-white)" />
      <path
        d="
        m 5 10
        v 0 5
        a 2,2 0 1,1 0,5
        a 2,2 0 1,0 0,5
        a 2,2 0 1,1 0,5
        a 2,2 0 1,0 0,5
        a 2,2 0 1,1 0,5
        a 2,2 0 1,0 0,5
        v 0 10
      "
        strokeWidth={1}
        stroke="var(--colour-white)"
        fill="transparent"
        // strokeDasharray={1}
      />
    </svg>
  );
};

export default VirtuosoVertDivider;
