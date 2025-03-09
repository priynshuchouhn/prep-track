
import { ExpandableButton } from '@/components/ui/expandable-button'
import { AuroraText } from '@/components/magicui/aurora-text'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Button } from '@/components/ui/button'
import ColourfulText from '@/components/ui/colourful-text'
import { GridPattern } from '@/components/ui/grid-pattern'
import Navbar from '@/components/ui/nav-bar'
import { SpotlightButton } from '@/components/ui/spotlight-button'
import { TextReveal } from '@/components/ui/text-reveal'
import { people, } from '@/lib/data'
import { Github, GraduationCap, Instagram, Linkedin, Trophy, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import RecentPosts from '@/components/ui/recent-posts'
import Leaderboard from '@/components/ui/leaderboard'

async function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <Navbar />

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
                    <ColourfulText text='Get Placed.' />
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
                  <div className='hidden md:block'>
                  <ExpandableButton cardContent={learnMoreButtonContent}>
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </ExpandableButton>
                  </div>
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
           <RecentPosts/>
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
          <Leaderboard/>
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
                Ready to start your <AuroraText className='hidden md:inline-block'>Placement</AuroraText> <ColourfulText text='Placement' className="inline-block md:hidden" /> journey?
              </h2>
            </TextReveal>
            <TextReveal>
              <p className="text-primary-foreground/80 max-w-[600px] mx-auto mb-8">
                Join students who are improving their skills and getting placed.
              </p>
            </TextReveal>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="px-8 cursor-pointer">
                Create Your Account
              </Button>
            </Link>
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

const learnMoreButtonContent = {
  title: "🚀 What is PrepTrack?",
  ctaText: "Start Posting",
  ctaLink: "/login",
  contentType: "prepTrackInfo",
};

export default LandingPage
