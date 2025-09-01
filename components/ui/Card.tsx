"use client"
import React from "react";

export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border bg-card p-4 shadow-sm ${className}`}>{children}</div>
  );
}
