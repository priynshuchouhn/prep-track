import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Comment, Like, Post, Tag, User } from '@prisma/client';
import { API_BASE_URL, timeAgo } from '@/lib/utils';
import axios from 'axios';
import PostCard from './post-card';

export type FeedPost = Post & {user:User, tags: Tag[], likes: Like[], comments: (Comment & {user: User})[]}

async function Feed() {
    const res = await axios.get(`${API_BASE_URL}/posts`)
    const posts: FeedPost[] = res.data
    return (
        <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full justify-start sticky top-[73px] md:top-[80px] h-full z-10 hidden md:flex">
                <TabsTrigger className="p-3" value="all">All Updates</TabsTrigger>
                <TabsTrigger disabled className="p-3" value="following">Following</TabsTrigger>
                <TabsTrigger disabled className="p-3" value="trending">Trending</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 mt-6">
                {posts.map((post) => (
                    <PostCard post={post} key={post.id}/>
                ))}
            </TabsContent>
        </Tabs>
    )
}

export default Feed
