import React from "react"


interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  id: string;
}


export function Input({ label, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input id={id} {...props} className='bg-fuchsia-50 mt-1 block rounded-lg font-light text-sm shadow-lg w-full px-3 py-2 border border-gray-200 focus:outline-none focus:ring-blue-300 focus:border-blue-500' />
    </div>);
}
