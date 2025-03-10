import React from 'react'
import { auth } from "@/auth";
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';


async function LeftSidebar() {
    const session = await auth();

  return (
    <div className="hidden md:block md:col-span-3">
    <div className="sticky top-24">
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <Avatar className="h-12 w-12">
            <Image src={session?.user.image || ""} alt="User" width={500} height={500} className="object-cover" />
          </Avatar>
          <div>
            <div className="font-semibold">{session?.user.name}</div>
            <div className="text-sm text-muted-foreground">🔥 {session?.user.currentStreak} day streak</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-semibold">{session?.user.postCount}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <div className="font-semibold">0</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
  )
}

export default LeftSidebar
