"use client"
import React from "react";

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium">
      {children}
    </label>
  );
}

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="mt-1 block w-full rounded-md" {...props} />;
}
