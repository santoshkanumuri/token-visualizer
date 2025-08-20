
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  'aria-label': string;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

export default IconButton;
