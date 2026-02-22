interface IconProps {
  className?: string;
}

export const Microphone = ({ className = "" }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 1C10.9 1 10 1.9 10 3V11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11V3C14 1.9 13.1 1 12 1Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M19 10V11C19 14.87 15.87 18 12 18C8.13 18 5 14.87 5 11V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 19V23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 23H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
