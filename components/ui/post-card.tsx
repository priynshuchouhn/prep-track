'use client'
import React, { useEffect, useState } from 'react'
import { Card } from './card';
import { Avatar } from './avatar';
import { Button } from './button';
import { Bookmark, Heart, MessageSquare, Share2 } from 'lucide-react';
import Image from 'next/image';
import { API_BASE_URL, APP_BASE_URL, timeAgo } from '@/lib/utils';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FeedPost } from './feed';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function PostCard({ post }: { post: FeedPost }) {
    const session = useSession();
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const postUrl = `${APP_BASE_URL}posts/${post.slug}`
    useEffect(()=>{
        setLiked(post.Like.findIndex(el => el.userId == session.data?.user.id)> -1)
    },[post.Like, session.data?.user.id])
    const toggleLike = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/posts/like`, { postId: post.id });
            setLiked(res.data.liked);
            router.refresh()
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    const handleCopyLink = async () => {
        try {
          await navigator.clipboard.writeText(postUrl);
          toast.success("Link copied to clipboard! 📋");
        } catch (error) {
          toast.error("Failed to copy link! ❌");
        }
      };
    
      const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Check out this post!",
              url: postUrl,
            });
          } catch (error:any) {
            if (error && error.name && error.name !== "AbortError") {
                // Only show toast if the error is NOT due to user canceling the share
                toast.error("Error sharing the post! ❌");
              }
          }
        } else {
          handleCopyLink(); // Fallback to copy if native sharing isn't available
        }
      };
    return (
        <Card className="p-2 md:p-6">
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
                <Button variant="ghost" size="lg" onClick={toggleLike}>
                    <Heart className={clsx("h-6 w-6", liked && 'fill-pink-800 stroke-red-900')} />
                    {post.Like.length > 0 && <span className='ml-1'>{post.Like.length}</span>}
                </Button>
                <Button disabled variant="ghost" size="lg">
                    <MessageSquare className="h-6 w-6 mr-2" />
                    {/* {post.comments} */}
                </Button>
                <Button variant="ghost" size="lg" onClick={handleShare}>
                    <Share2 className="h-6 w-6 mr-2" />
                    <span className="hidden md:block">Share</span>
                </Button>
                <Button variant="ghost" size="lg">
                    <Bookmark className="h-6 w-6 mr-2" />
                    <span className="hidden md:block">Save</span>
                </Button>
            </div>
        </Card>
    )
}

export default PostCard
