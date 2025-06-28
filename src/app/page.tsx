"use client";

import { memo } from 'react';
import Logo from "@/app/components/Logo";
import { Typography } from '@mui/material';
const MemoizedLogo = memo(Logo);

export default function Home() {
  return (
    <div className="flex flex-col items-center h-[calc(90vh-120px)] px-4 py-8 dark:bg-black">
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <span className="text-black font-mono dark:text-white font-bold text-5xl tracking-tight leading-none text-center z-10 mb-8 text-[clamp(4rem,14vw,9rem)] [text-shadow:1.5px_1.5px_0_rgba(68,68,68,0.067),2px_2px_5px_rgba(221,221,221,0.467)]">
          Zoku
        </span>
        <MemoizedLogo className="mb-6" height={200} width={200} />

        <p className="text-lg text-gray-700 dark:text-gray-300">a minimalist calendar app</p>
      </div>
    </div>
  );
}


