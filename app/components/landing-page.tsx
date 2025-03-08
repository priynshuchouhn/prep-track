'use client'
import { AuroraText } from '@/components/magicui/aurora-text'
import { MagicCard } from '@/components/magicui/magic-card'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ColourfulText from '@/components/ui/colourful-text'
import { FloatingCard } from '@/components/ui/floating-card'
import { GridPattern } from '@/components/ui/grid-pattern'
import { HoverCard } from '@/components/ui/hover-card'
import Navbar from '@/components/ui/nav-bar'
import { SpotlightButton } from '@/components/ui/spotlight-button'
import { TextReveal } from '@/components/ui/text-reveal'
import { leaderboardUsers, people, recentPosts } from '@/lib/data'
import clsx from 'clsx'
import { BookOpen, Calendar, Github, GraduationCap, Instagram, Linkedin, MessageSquare, Trophy, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function LandingPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
  
      // Add grid pattern style
      const style = document.createElement("style")
      style.innerHTML = `
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `
      document.head.appendChild(style)
  
      return () => {
        document.head.removeChild(style)
      }
    }, [])
  
    if (!mounted) return null
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
        <Navbar/>

      <main className="flex-1 justify-center px-2 lg:px-0">
        {/* Hero Section with Aceternity UI inspired background */}
        <section className="relative overflow-hidden py-12 md:py-20 lg:py-24 flex justify-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>

          <div className="container relative z-10 py-12 md:py-20 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col gap-4">
                <TextReveal>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Stay Consistent. <br />
                    <ColourfulText text='Get Placed.'/>
                  </h1>
                </TextReveal>
                <TextReveal>
                  <p className="text-xl text-muted-foreground max-w-[600px]">
                    Track your progress, share learning updates, and stay accountable for placements.
                  </p>
                </TextReveal>
                <div className="flex gap-4 mt-4">
                  <SpotlightButton size="lg" className="px-8">
                    Start Posting
                  </SpotlightButton>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>

                <div className="mt-8 flex items-center gap-5">
                  <div className="flex flex-row items-center justify-center">
                    <AnimatedTooltip items={people} />
                    </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      <AnimatedCounter value={50} />+
                    </span>{" "}
                    students already joined
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <BackgroundGradient className="rounded-lg p-1 aspect-square">
                  <Image
                    src="https://res.cloudinary.com/dw1navurk/image/upload/v1741446930/prep-track/kmcp45uawywbbpnfttqy.jpg"
                    alt="Students learning together"
                    width={500}
                    height={400}
                    className="rounded-lg object-cover"
                    priority
                  />
                </BackgroundGradient>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/30 py-12 flex justify-center">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">
                  <AnimatedCounter value={10} />+
                </h3>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">
                  <AnimatedCounter value={50} />+
                </h3>
                <p className="text-sm text-muted-foreground">Daily Posts</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">
                  <AnimatedCounter value={50} />+
                </h3>
                <p className="text-sm text-muted-foreground">Projected Placements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Feed with Aceternity UI inspired cards */}
        <section className="bg-muted/50 py-12 md:py-16 flex justify-center">
          <div className="container">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Recent Learning Updates</h2>
              <p className="text-muted-foreground">See what other students are learning and sharing</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post, index) => (
                <FloatingCard key={post.id} delay={index * 150}>
                  <HoverCard>
                    <Card className="overflow-hidden h-full border border-border/50 bg-background/50 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar>
                            <AvatarImage src={post.user.avatar} alt={post.user.name} />
                            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{post.user.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.date}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4">{post.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {post.reads}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </HoverCard>
                </FloatingCard>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <SpotlightButton variant="outline">View All Posts</SpotlightButton>
            </div>
          </div>
        </section>

        {/* Leaderboard Section with Aceternity UI inspired cards */}
        <section className="py-12 md:py-16">
          <div className="flex flex-col gap-2 mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Consistency Leaderboard</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Students who are consistently sharing their learning journey
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-3xl mx-auto">
            {leaderboardUsers.map((user, index) => (
              <FloatingCard key={user.id} delay={index * 200}>
                  <Card className={`py-0 cursor-pointer`}> 
                    {/* overflow-hidden border-2 bg-background/80 backdrop-blur-sm */}
                  <MagicCard gradientColor='#262626' gradientOpacity={0.05}>
                    <div className="p-6 text-center">
                      <div className="relative mx-auto mb-4">
                        <Avatar className="h-20 w-20 mx-auto">
                          <AvatarImage src={user.avatar} alt={user.name} className='object-cover' />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div
                          className={clsx(
                            'absolute -top-2 -right-2 text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm',
                            index === 0 && 'bg-yellow-500',
                            index === 1 && 'bg-gray-400', 
                            index === 2 && 'bg-amber-700'
                          )}
                        >
                          #{index + 1}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">Batch {user.batch}</p>
                      <div className="flex justify-center gap-2 mb-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {user.streak} day streak
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.posts} posts this month</p>
                    </div>
                  </MagicCard>
                  </Card>
              </FloatingCard>
            ))}
          </div>
        </section>

        {/* CTA Section with Aceternity UI inspired background */}
        <section className="relative overflow-hidden py-12 md:py-16 flex justify-center">
          <div className="absolute inset-0 bg-primary/90"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-foreground/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-foreground/20 blur-3xl"></div>

          <div className="container relative z-10 text-center">
            <TextReveal>
              <h2 className="text-3xl font-bold tracking-tighter mb-4 text-primary-foreground">
                Ready to start your <AuroraText>Placement</AuroraText> journey?
              </h2>
            </TextReveal>
            <TextReveal>
              <p className="text-primary-foreground/80 max-w-[600px] mx-auto mb-8">
                Join students who are improving their skills and getting placed.
              </p>
            </TextReveal>
            <Button size="lg" variant="secondary" className="px-8 cursor-pointer">
              Create Your Account
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <GridPattern>
        <footer className="px-2 border-t py-8 md:py-12 flex justify-center">
          <div className="container">
            <div className="grid gap-3 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5" />
                  <span className="font-bold">Prep Track</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Helping students stay consistent and get placed at their dream companies.
                </p>
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Testimonials
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Prep Track. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </GridPattern>
    </div>
  )
}

export default LandingPage
