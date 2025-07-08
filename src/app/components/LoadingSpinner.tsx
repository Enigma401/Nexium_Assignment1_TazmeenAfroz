'use client';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Generating quote..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200/30 border-solid rounded-full animate-spin border-t-blue-400"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-solid rounded-full animate-ping border-t-blue-300/50"></div>
      </div>
      <p className="mt-4 text-white/80 text-sm animate-pulse">{message}</p>
    </div>
  );
}
