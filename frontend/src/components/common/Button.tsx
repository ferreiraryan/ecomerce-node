

interface ButtonProps extends React.ComponentProps<'button'> {
}

export function Button({ children, className, ...props }: ButtonProps) {
  const buttonClasses = `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className || ''}`;

  return (
    <button
      {...props}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}

