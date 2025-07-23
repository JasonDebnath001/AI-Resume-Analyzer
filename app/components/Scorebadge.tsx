import React from 'react'

interface ScorebadgeProps {
  score: number | string;
  className?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 8) {
    return '#22c55e'; // green
  } else if (score >= 6) {
    return '#eab308'; // yellow
  } else if (score >= 4) {
    return '#f97316'; // orange
  } else {
    return '#ef4444'; // red
  }
};

const Scorebadge: React.FC<ScorebadgeProps> = ({ score, className = '' }) => {
  const numericScore = typeof score === 'number' ? score : Number(score);
  const color = getScoreColor(numericScore);

  return (
    <span
      className={className}
      style={{
        color,
        fontWeight: 600,
        fontSize: '1.5rem',
        marginLeft: 'auto',
        // No background, no border, right-aligned
      }}
    >
      {score}
    </span>
  );
};

export default Scorebadge