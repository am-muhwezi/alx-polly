"use client"
import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-6 max-w-lg w-full">{children}</div>
    </div>
  );
}
