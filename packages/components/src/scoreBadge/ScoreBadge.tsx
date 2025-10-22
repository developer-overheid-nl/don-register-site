import clsx from "clsx";

export interface ScoreBadgeProps {
  className?: string;
  name: string;
  ariaLabelPrefix?: string;
  score?: number | null;
  max?: number;
  showScore?: boolean;
  showMax?: boolean;
  inPercentage?: boolean;
  colors?: {
    background: string;
    gradient: string[];
    arrow: [string, string];
    text: string;
  };
}

export default function ScoreBadge(props: ScoreBadgeProps) {
  const defaultcolors: ScoreBadgeProps["colors"] = {
    background: "#CBD5E1",
    gradient: ["#FEE9B7", "#FDDE94", "#A5C991", "#6AA549", "#39870C"],
    arrow: ["#D52B1E", "#F9DFDD"],
    text: "#334155",
  };
  const {
    className,
    name,
    ariaLabelPrefix,
    score,
    max = 10,
    showScore = true,
    showMax = false,
    inPercentage = false,
    colors = defaultcolors,
    ...restProps
  } = props;

  return (
    <span
      className={clsx(["score-badge", `score-badge--${score}`, className])}
      {...restProps}
    >
      <svg
        width="5rem"
        height="2.5rem"
        viewBox="0 0 32 16"
        name={name}
        aria-label={`${ariaLabelPrefix || ""}${score + (inPercentage ? "%" : "") || "onbekend"}`}
      >
        <defs>
          <linearGradient id="gradient">
            {colors.gradient &&
              colors.gradient.map((color, index) => (
                <stop
                  key={`grd-${index}`}
                  offset={`${(index * 100) / (colors.gradient.length - 1)}%`}
                  style={{ stopColor: color, stopOpacity: 1 }}
                />
              ))}
          </linearGradient>
          <linearGradient id="arrow" gradientTransform="rotate(90)">
            {colors.arrow &&
              colors.arrow.map((color, index) => (
                <stop
                  key={`arr-${index}`}
                  offset={index}
                  style={{ stopColor: color }}
                />
              ))}
          </linearGradient>
          <filter id="glow">
            <feDropShadow
              dx="0.25"
              dy="0.25"
              stdDeviation="0.5"
              floodColor="#fff"
              floodOpacity="1"
            />
          </filter>
        </defs>
        <circle
          cx="16"
          cy="13"
          r="10"
          fill="none"
          stroke={colors.background}
          strokeWidth="5"
          strokeDasharray={`${Math.PI * 10} 1000`}
          strokeDashoffset={-1 * Math.PI * 10}
          strokeLinecap="round"
        />
        {score && score > 0 && (
          <>
            <circle
              cx="16"
              cy="13"
              r="10"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="5"
              strokeDasharray={`${(Math.PI * 10 * score) / max} 1000`}
              strokeDashoffset={-1 * Math.PI * 10}
              strokeLinecap="round"
            />
            <polygon
              points="16,15 14,13 16,2 18,13"
              transform={`rotate(${-90 + score * 1.8}, 16, 13)`}
              fill="url(#arrow)"
            />
          </>
        )}
        {showScore && (
          <text
            x="16"
            y="15"
            textAnchor="middle"
            fontSize="0.4rem"
            fontWeight={600}
            fill={colors.text}
            lengthAdjust="spacing"
            filter="url(#glow)"
          >
            {typeof score === "number"
              ? `${score}${showMax ? `/${max}` : ""}${inPercentage ? "%" : ""}`
              : "–"}
          </text>
        )}
      </svg>
    </span>
  );
}
