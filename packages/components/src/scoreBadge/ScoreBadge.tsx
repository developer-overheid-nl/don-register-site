
interface ScoreBadgeProps {
  className?: string;
  name: string;
  score?: number;
  max?: number;
  showScore?: boolean;
  showMax?: boolean;
  inPercentage?: boolean;
  colors?: {
    background: string;
    gradient: string[];
  }
}

export default function ScoreBadge (props : ScoreBadgeProps) {
  const defaultcolors: ScoreBadgeProps['colors'] = {
    background: '#CBD5E1',
    gradient: ['#E17000', '#FFB612', '#F9E11E', '#F9E11E', '#39870C']
  };
  const { className, name, score, max = 10, showScore = true, showMax = false, inPercentage = false, colors = defaultcolors, ...restProps } = props;

  return (
    <span className={`score-badge score-badge--${score} ${className}`} {...restProps} aria-label={`TODO: Score voor ${name}: ${score || 'onbekend'}`}>
      <svg width="4rem" height="2rem" viewBox="0 0 32 16">
        <defs>
          <linearGradient id="gradient">
            {colors.gradient && colors.gradient.map((color, index) => (
              <stop key={index} offset={`${index * 100 / (colors.gradient.length - 1)}%`} style={{ stopColor: color, stopOpacity: 1 }} />
            ))}
          </linearGradient>
        </defs>
        <circle cx="16" cy="13" r="10" fill="none" 
          stroke={colors.background} 
          strokeWidth="5" 
          strokeDasharray={`${(Math.PI * 10)} 1000`}
          strokeDashoffset={-1 * Math.PI * 10}
          strokeLinecap="round" />
        {score && score > 0 && (
          <circle cx="16" cy="13" r="10" fill="none" 
            stroke="url(#gradient)" 
            strokeWidth="5" 
            strokeDasharray={`${(Math.PI * 10 * score) / max} 1000`}
            strokeDashoffset={-1 * Math.PI * 10}
            strokeLinecap="round" />
        )}
        {showScore && (
          <text x="16" y="16" 
            textAnchor="middle" 
            fontSize="0.45rem" 
            textLength="0.75rem" 
            lengthAdjust="spacing"
          >{typeof score === 'number' ? `${score}${showMax ? `/${max}` : ''}${inPercentage ? '%' : ''}` : '–'}</text>
        )}
      </svg>
    </span>
  );
}
