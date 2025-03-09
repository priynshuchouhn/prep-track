import { recentPosts } from '@/lib/data'
import React from 'react'
import { FloatingCard } from './floating-card'
import { BookOpen, Calendar, MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Card } from './card'
import { HoverCard } from './hover-card'
import { Badge } from './badge'
import axios from 'axios'
import { Post, User } from '@prisma/client'
import { API_BASE_URL, timeAgo } from '@/lib/utils'



async function RecentPosts() {
  const res = await axios.get(`${API_BASE_URL}/posts`,{
    params: {
      limit : 3
    }
  });
  const { data } = res
  const recentPosts = data || []
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recentPosts.map((post: Post & { user: User }, index: number) => (
        <FloatingCard key={post.id} delay={index * 150}>
          <HoverCard>
            <Card className="overflow-hidden h-full border border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={post.user.image || ""} alt={post.user.name} className='object-cover' />
                    <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.user.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {timeAgo(post.createdAt)}
                    </div>
                  </div>
                </div>
                {/* <h3 className="font-semibold mb-2">{post.title}</h3> */}
                <p className="font-semibold text-muted-foreground mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* <div className="flex items-center gap-4 mt-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {post.comments}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {post.reads}
                </div>
              </div> */}
              </div>
            </Card>
          </HoverCard>
        </FloatingCard>
      ))}
    </div>
  )
}

export default RecentPosts
