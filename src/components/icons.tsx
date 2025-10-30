import React from "react";

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M10.5 13.5L3 21" />
    <circle cx="6.5" cy="9.5" r="5.5" />
    <path d="M14 14l6-6" />
    <path d="m21 15-4-4" />
    <path d="M14 19.5v-5.5" />
    <path d="M18 16h-5.5" />
  </svg>
);
