'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  children,
  disabled,
  isLoading,
  className = '',
  ...props
}: ButtonProps) {

  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: `
      bg-oasis-green text-white
      hover:bg-green-700
      focus:ring-green-500
      disabled:bg-gray-600
      disabled:text-gray-200
      disabled:cursor-not-allowed
      disabled:hover:bg-gray-600
    `,
    secondary: `
      bg-gray-200 text-gray-800
      hover:bg-gray-300
      focus:ring-gray-400
      disabled:bg-gray-300
      disabled:text-gray-500
      disabled:cursor-not-allowed
      disabled:hover:bg-gray-300
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
      disabled:bg-gray-600
      disabled:text-gray-200
      disabled:cursor-not-allowed
      disabled:hover:bg-gray-600
    `,
    success: `
      bg-green-600 text-white
      hover:bg-green-700
      focus:ring-green-500
      disabled:bg-gray-600
      disabled:text-gray-200
      disabled:cursor-not-allowed
      disabled:hover:bg-gray-600
    `,
    warning: `
      bg-yellow-600 text-white
      hover:bg-yellow-700
      focus:ring-yellow-500
      disabled:bg-gray-600
      disabled:text-gray-200
      disabled:cursor-not-allowed
      disabled:hover:bg-gray-600
    `
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <button
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  );
}
