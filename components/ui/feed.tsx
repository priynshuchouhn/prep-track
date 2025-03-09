import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from './card';
import { Avatar } from './avatar';
import { Button } from './button';
import { Bookmark, MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { Post, Tag, User } from '@prisma/client';
import { API_BASE_URL, timeAgo } from '@/lib/utils';
import axios from 'axios';

type FeedPost = Post & {user:User, tags: Tag[]}

async function Feed() {
    const res = await axios.get(`${API_BASE_URL}/posts`)
    const posts: FeedPost[] = res.data
    return (
        <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full justify-start sticky top-[73px] md:top-[80px] h-full z-10 hidden md:flex">
                <TabsTrigger className="p-3" value="all">All Updates</TabsTrigger>
                <TabsTrigger className="p-3" value="following">Following</TabsTrigger>
                <TabsTrigger className="p-3" value="trending">Trending</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 mt-6">
                {posts.map((post) => (
                    <Card key={post.id} className="p-2 md:p-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <Avatar>
                                <Image src={post.user.image || ""} alt={post.user.name} width={500} height={500} className="object-cover" />
                            </Avatar>
                            <div>
                                <div className="font-semibold">{post.user.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                    <span>{timeAgo(post.createdAt)}</span>
                                    <span className="mx-2">•</span>
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                                        {post.tags[0]}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-foreground whitespace-pre-line">{post.content}</p>
                        <div className="flex items-center justify-evenly space-x-4 mt-4 pt-4 border-t">
                            <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                {/* {post.likes} */}
                            </Button>
                            <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                {/* {post.comments} */}
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4 mr-2" />
                                <span className="hidden md:block">Share</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Bookmark className="h-4 w-4 mr-2" />
                                <span className="hidden md:block">Save</span>
                            </Button>
                        </div>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    )
}

export default Feed
