import { GraduationCap, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { SpotlightButton } from './spotlight-button'
import { Avatar, AvatarFallback } from './avatar'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { auth, signOut } from '@/auth'

async function Navbar({ isHomePage = false }: { isHomePage?: boolean }) {
  const session = await auth()
  // const session = {user:{image:"", name: ""}}
  const user = session?.user || undefined
  return (
    <header className="sticky p-2 top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <GraduationCap className="h-8 w-8" />
            <Sparkles className="h-4 w-4 absolute -top-1 -right-2 text-yellow-800 animate-pulse" />
          </div>
          <span className="font-bold">Prep Track</span>
        </Link>
        {isHomePage ?
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <Image src={session?.user?.image || ""} alt="User" width={500} height={500} className="object-cover" />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <form action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                  }}>
                    <button type='submit'>Log out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> : <nav className="flex gap-4">
            <Link href={'/login'}>
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href={'/register'}>
              <SpotlightButton size="sm">Sign Up</SpotlightButton>
            </Link>
          </nav>
        }
      </div>
    </header>
  )
}

export default Navbar
