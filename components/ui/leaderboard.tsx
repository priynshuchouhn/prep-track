import React from 'react'
import { FloatingCard } from './floating-card'
import { Card } from './card'
import { MagicCard } from '../magicui/magic-card'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import clsx from 'clsx'
import { Badge } from './badge'
import { Trophy } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/utils'
import { Leaderboard, Post, User } from '@prisma/client'

async function LeaderboardSection() {
  const res = await axios.get(`${API_BASE_URL}/leaderboard`, {
    params: {
      limit: 3
    }
  });
  const leaderboardUsers = res.data
  return (
    <div className="grid gap-8 md:grid-cols-3 max-w-3xl mx-auto">
            {leaderboardUsers.map((leaderboardUser: Leaderboard & {user: User & {posts: Post[]}}, index:number) => (
              <FloatingCard key={leaderboardUser.id} delay={index * 200}>
                <Card className={`py-0 cursor-pointer`}>
                  {/* overflow-hidden border-2 bg-background/80 backdrop-blur-sm */}
                  <MagicCard gradientColor='#262626' gradientOpacity={0.05}>
                    <div className="p-6 text-center">
                      <div className="relative mx-auto mb-4">
                        <Avatar className="h-20 w-20 mx-auto">
                          <AvatarImage src={leaderboardUser.user.image || ""} alt={leaderboardUser.user.name} className='object-cover' />
                          <AvatarFallback>{leaderboardUser.user.name.substring(0, 2)}</AvatarFallback>
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
                      <h3 className="font-semibold text-lg">{leaderboardUser.user.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">Batch A</p>
                      <div className="flex justify-center gap-2 mb-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {leaderboardUser.streak} day streak
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{leaderboardUser.user.posts.length} posts this month</p>
                    </div>
                  </MagicCard>
                </Card>
              </FloatingCard>
            ))}
          </div>
  )
}

export default LeaderboardSection
