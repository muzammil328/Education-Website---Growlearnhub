import React from 'react'

export function CurvedSvg() {
    return (
        <svg width="260" height="40" viewBox="0 0 260 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 35C85 20 175 20 250 32"
                stroke="#FACC15"
                stroke-width="4"
                stroke-linecap="round"
            />
        </svg>
    )
}

type CheckIconProps = {
  className?: string;
};

export function CheckIcon({ className = "" }: CheckIconProps) {
  return (
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="h-3 w-3 stroke-white"
      >
        <path
          d="M5 12.5L10 17L19 7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
