import { BookOpen, Sparkles, Home, ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
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
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo and 404 */}
        <div className="relative mb-8">
          <div className="relative">
            <GraduationCap className="h-20 w-20 text-primary animate-pulse" />
            <Sparkles 
              className="h-8 w-8 absolute -top-2 -right-2 text-yellow-400"
              style={{
                animation: "sparkle 1.5s ease-in-out infinite",
                transformOrigin: "center"
              }}
            />
          </div>
        </div>

        {/* Error message */}
        <h1 className="text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mb-8">
          Oops! It seems like you&apos;ve ventured into uncharted territory. 
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-muted-foreground/40">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
          <span className="text-sm font-medium uppercase tracking-widest">404</span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
        </div>
      </div>
    </div>
  );
}