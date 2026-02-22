interface IconProps {
  className?: string;
}

export const Speaker = ({ className = "" }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 2C13.1 2 14 2.9 14 4V8L18 12V16L14 20V22C14 23.1 13.1 24 12 24C10.9 24 10 23.1 10 22V20L6 16V12L10 8V4C10 2.9 10.9 2 12 2Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 6C12.55 6 13 6.45 13 7V9C13 9.55 12.55 10 12 10C11.45 10 11 9.55 11 9V7C11 6.45 11.45 6 12 6Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M12 12C12.55 12 13 12.45 13 13V15C13 15.55 12.55 16 12 16C11.45 16 11 15.55 11 15V13C11 12.45 11.45 12 12 12Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);
