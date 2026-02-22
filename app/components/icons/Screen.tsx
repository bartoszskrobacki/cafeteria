interface IconProps {
  className?: string;
}

export const Screen = ({ className = "" }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 21L12 17L16 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
