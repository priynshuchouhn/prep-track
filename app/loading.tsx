"use client";

import {  GraduationCap, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(63,94,251,0.1),rgba(252,70,107,0.1))]" />
        </div>
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 -top-32 -left-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-64 h-64 -bottom-32 -right-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with glow effect */}
        <div className="relative mb-12 p-6 rounded-full bg-background/50 backdrop-blur-xl border border-white/10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
          <div className="relative flex items-center justify-center">
            <div className="relative">
              <GraduationCap className="h-16 w-16 text-primary animate-pulse" />
              <Sparkles 
                className="h-8 w-8 absolute -top-2 -right-2 text-yellow-400"
                style={{
                  animation: "sparkle 1.5s ease-in-out infinite",
                  transformOrigin: "center"
                }}
              />
            </div>
          </div>
        </div>

        {/* Brand name with gradient */}
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
          Prep Track
        </h1>

        {/* Loading indicator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary"
                style={{
                  animation: "bounce 1s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading message */}
        <p className="text-muted-foreground text-lg animate-pulse">
          Preparing your experience...
        </p>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            style={{
              animation: "loading 2s ease-in-out infinite",
              width: "100%",
              transformOrigin: "left"
            }}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-muted-foreground/40">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
        <span className="text-sm font-medium uppercase tracking-widest">Loading</span>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
      </div>

    </div>
  );
}