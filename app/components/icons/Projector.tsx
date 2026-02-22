interface IconProps {
  className?: string;
}

export const Projector = ({ className = "" }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" ry="2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 18V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 22H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" fill="white" stroke="currentColor" strokeWidth="1" />
    <path d="M12 9V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 12H15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
