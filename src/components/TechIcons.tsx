import React from 'react';

export function ClaudeIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fill="#D97757"
        d="M17.5 12a5.5 5.5 0 0 1-5.5 5.5A5.5 5.5 0 0 1 6.5 12 5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 5.5 5.5zm4.5 0c0-1.8-.4-3.4-1.2-4.9l-3.3 1.9c.5 1 .8 2 .8 3s-.3 2-.8 3l3.3 1.9c.8-1.5 1.2-3.1 1.2-4.9zm-16 0c0-1 .3-2 .8-3L3.5 7.1C2.7 8.6 2.3 10.2 2.3 12s.4 3.4 1.2 4.9l3.3-1.9c-.5-1-.8-2-.8-3zm6-7.5c1 0 2 .3 3 .8l1.9-3.3C15.4 3.2 13.8 2.8 12 2.8s-3.4.4-4.9 1.2l1.9 3.3c1-.5 2-.8 3-.8zm0 15c-1 0-2-.3-3-.8l-1.9 3.3c1.5.8 3.1 1.2 4.9 1.2s3.4-.4 4.9-1.2l-1.9-3.3c-1 .5-2 .8-3 .8z"
      />
    </svg>
  );
}

export function OpenAIIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M21.5 10.2a6.3 6.3 0 0 0-.5-4.8 6.4 6.4 0 0 0-5.8-3.3 6.2 6.2 0 0 0-2.3.4A6.3 6.3 0 0 0 8.3 1a6.4 6.4 0 0 0-6 4.3 6.3 6.3 0 0 0 .8 6 6.3 6.3 0 0 0 .5 4.8 6.4 6.4 0 0 0 5.8 3.3c.8 0 1.6-.2 2.3-.5a6.3 6.3 0 0 0 4.6 1.5 6.4 6.4 0 0 0 6-4.3 6.3 6.3 0 0 0-.8-5.9zm-8.8 11.2a4.9 4.9 0 0 1-3.2-1.2l.2-.1 4.5-2.6a.8.8 0 0 0 .4-.7v-5.4l1.9 1.1v5.1a4.9 4.9 0 0 1-3.8 3.8zm-8.4-4a4.9 4.9 0 0 1-.6-3.4l.2.1 4.5 2.6a.8.8 0 0 0 .8 0l4.7-2.7v2.2l-4.4 2.6a4.9 4.9 0 0 1-5.2-1.4zm-1.8-8.2a4.9 4.9 0 0 1 2.6-2.2v5.4a.8.8 0 0 0 .4.7l4.7 2.7-1.9 1.1-4.4-2.6a4.9 4.9 0 0 1-1.4-5.1zm14.3 2.5-4.7-2.7 1.9-1.1 4.4 2.6a4.9 4.9 0 0 1 1.4 5.1 4.9 4.9 0 0 1-2.6 2.2v-5.4a.8.8 0 0 0-.4-.7zm2.4-2.3l-.2-.1-4.5-2.6a.8.8 0 0 0-.8 0l-4.7 2.7V7.2l4.4-2.5a4.9 4.9 0 0 1 5.8 1.5zm-8.4-2.7a4.9 4.9 0 0 1 3.2 1.2l-.2.1-4.5 2.6a.8.8 0 0 0-.4.7v5.4l-1.9-1.1V6.5a4.9 4.9 0 0 1 3.8-3.8zM10.8 13l2-1.2 2 1.2v2.3l-2 1.2-2-1.2V13z"
        fill="#10A37F"
      />
    </svg>
  );
}

export function NextjsIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="90" fill="#000" />
      <path
        d="M149.5 159.2 68.7 54.4H53.5v71.2h12.6V70.6l71.4 92.4c4.1-1.1 8.1-2.4 12-3.8z"
        fill="#FFF"
      />
      <path d="M115.3 54.4h12.6v45.4l-12.6-16.3V54.4z" fill="#FFF" />
    </svg>
  );
}

export function ReactIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.232 23 20.463" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function TypescriptIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M11.75 14.8c-.3.4-.7.7-1.2.9-.5.2-1.1.3-1.8.3-.9 0-1.7-.2-2.3-.7-.6-.5-.9-1.2-.9-2.1 0-.9.3-1.6.9-2.1.6-.5 1.5-.8 2.5-.8.5 0 1 .1 1.4.2.4.1.7.3.9.5l-.6 1.1c-.2-.1-.5-.3-.8-.4-.3-.1-.7-.1-1-.1-.6 0-1.1.2-1.5.5-.4.3-.6.8-.6 1.4 0 .6.2 1 .5 1.3.3.3.8.5 1.4.5.4 0 .7 0 1-.1.3-.1.5-.2.7-.4l.5 1zm2.3-5.9h4.3v1.2h-1.5v5.8h-1.3v-5.8H14v-1.2z"
        fill="#FFF"
      />
    </svg>
  );
}

export function TailwindIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#06B6D4">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );
}

export function GsapIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#88CE02">
      <circle cx="12" cy="12" r="10" fill="#88CE02" />
      <path
        d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6c2.8 0 5.2-1.9 5.8-4.5h-2.1c-.5 1.5-1.9 2.5-3.7 2.5-2.2 0-4-1.8-4-4s1.8-4 4-4c1.8 0 3.2 1 3.7 2.5h2.1C17.2 7.9 14.8 6 12 6z"
        fill="#000"
      />
    </svg>
  );
}

export function ThreejsIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000">
      <path d="M12 2 3.5 19.5 20.5 19.5 12 2zm0 3.8 5.6 11.7H6.4L12 5.8zm-2.4 7.6 1.2-2.5 1.2 2.5h-2.4z" />
    </svg>
  );
}

export function FigmaIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 38 57" fill="none">
      <path
        d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
        fill="#0ACF83"
      />
      <path
        d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  );
}

export function CursorIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#0D0D0D" />
      <path
        d="M7 6l10 5.5-4.5 1.5-1.5 4.5L7 6z"
        fill="#38BDF8"
      />
    </svg>
  );
}
