import React from 'react';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b14b83ab7d0105235b5a5f/f833e5f03_generated_image.png";

export default function Logo({ size = "default" }) {
  const sizes = {
    small: "h-8",
    default: "h-10",
    large: "h-16",
  };

  return (
    <div className="flex items-center gap-3">
      <img src={LOGO_URL} alt="TOO EMBAMUNAY REFINERY" className={`${sizes[size]} w-auto object-contain`} />
      <div className="flex flex-col">
        <span className="font-bold text-base tracking-widest uppercase leading-tight">TOO "EMBAMUNAY" REFINERY</span>
        <span className="text-[10px] tracking-wide text-muted-foreground leading-snug">OKED: Crude oil and associated gas production.</span>
        <span className="text-[10px] tracking-wide text-muted-foreground leading-snug">BIN: 990140005305.</span>
      </div>
    </div>
  );
}