import { GraduationCap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { SpotlightButton } from './spotlight-button'
import { Avatar } from './avatar'
import Image from 'next/image'

function Navbar({isHomePage = false}: {isHomePage?:boolean}) {
  return (
    <header className="sticky p-2 top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
    <div className="container flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <GraduationCap className="h-6 w-6" />
        <span className="font-bold">Prep Track</span>
      </Link>
      {isHomePage ? 
        <div className="flex items-center space-x-4">
        <Avatar className="h-8 w-8">
          <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" alt="User" width={500} height={500} className="object-cover" />
        </Avatar>
      </div> :   <nav className="flex gap-4">
        <Button variant="outline" size="sm">
          Login
        </Button>
        <SpotlightButton size="sm">Sign Up</SpotlightButton>
      </nav>
    }
    </div>
  </header>
  )
}

export default Navbar
