"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { GraduationCap, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading,setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "alice@tims.edu",
      password: "password123",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        setIsLoading(false);
        setError("Invalid email or password");
        return;
      }
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{
      background: "linear-gradient(to bottom right, rgba(240, 242, 250, 1) 0%, rgba(235, 238, 252, 1) 100%)"
    }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <GraduationCap className="h-8 w-8" />
              <Sparkles className="h-4 w-4 absolute -top-1 -right-2 text-yellow-800 animate-pulse" />
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Prep Track
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-900">
            Welcome back
          </h2>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <Card className="glass border-0">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="bg-accent/50 border-accent-foreground/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="bg-accent/50 border-accent-foreground/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="text-sm text-red-400 text-center">
                    {error}
                  </div>
                )}

                <Button
                disabled={isLoading}
                  type="submit"
                  className="w-full font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  {isLoading ? 'Signing in...' :'Sign In'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-accent/20 pt-6">
            <div className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-300 transition-colors font-bold"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}