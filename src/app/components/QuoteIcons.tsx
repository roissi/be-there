import React from 'react';

// Composant pour l'icône de début de citation
export const QuoteOpen = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => (
  <div className={`inline-block ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
    </svg>
  </div>
);

// Composant pour l'icône de fin de citation
export const QuoteClose = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => (
  <div className={`inline-block ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M11 9.275c0 5.141-3.892 10.519-10 11.725l-.984-2.126c2.215-.835 4.163-3.742 4.38-5.746-2.491-.392-4.396-2.547-4.396-5.149 0-3.182 2.584-4.979 5.199-4.979 3.015 0 5.801 2.305 5.801 6.275zm13 0c0 5.141-3.892 10.519-10 11.725l-.984-2.126c2.215-.835 4.163-3.742 4.38-5.746-2.491-.392-4.396-2.547-4.396-5.149 0-3.182 2.584-4.979 5.199-4.979 3.015 0 5.801 2.305 5.801 6.275z" />
    </svg>
  </div>
);
