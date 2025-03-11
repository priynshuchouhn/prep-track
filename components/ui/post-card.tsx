'use client'
import React, { useEffect, useState } from 'react'
import { Card } from './card';
import { Avatar } from './avatar';
import { Button } from './button';
import { Bookmark, Circle, Heart, MessageSquare, Send, Share2 } from 'lucide-react';
import Image from 'next/image';
import { API_BASE_URL, APP_BASE_URL, timeAgo } from '@/lib/utils';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FeedPost } from './feed';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Textarea } from './textarea';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const commentSchema = z.object({
    content: z.string().min(1, "Comment cannot be empty"),
    postId: z.string().min(1, "Comment cannot be empty"),
});

type PostCommentData = z.infer<typeof commentSchema>;


function PostCard({ post }: { post: FeedPost }) {
    const session = useSession();
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const postUrl = `${APP_BASE_URL}posts/${post.slug}`
    useEffect(() => {
        setLiked(post.likes.findIndex(el => el.userId == session.data?.user.id) > -1)
    }, [post.likes, session.data?.user.id])
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
            } catch (error: any) {
                if (error && error.name && error.name !== "AbortError") {
                    // Only show toast if the error is NOT due to user canceling the share
                    toast.error("Error sharing the post! ❌");
                }
            }
        } else {
            handleCopyLink(); // Fallback to copy if native sharing isn't available
        }
    };
    const handleCommentSubmit = async (data: PostCommentData) => {
        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/posts/comment`, data);
            reset();
            router.refresh();
          } catch (error) {
            console.error(error);
            alert("Error posting update. Try again.");
          } finally {
            setLoading(false);
          }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
            postId: post.id
        },
    });
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
                    {post.likes.length > 0 && <span className='ml-1'>{post.likes.length}</span>}
                </Button>
                <Button variant="ghost" size="lg" onClick={() => setShowComments(!showComments)}>
                    <MessageSquare className="h-6 w-6" />
                    {post.comments.length > 0 && <span className='ml-1'>{post.comments.length}</span>}
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
            {/* Comments Section */}
            {showComments && (
                <div className="mt-4 pt-4 border-t space-y-4">
                    {/* Comment Input */}
                    <form onSubmit={handleSubmit(handleCommentSubmit)} className="flex items-center gap-4">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                            <Image
                                src={session.data?.user.image || ""}
                                alt="Your avatar"
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                            <div className="flex-1">
                                <Textarea
                                    {...register("content")}
                                    placeholder="Write a content..."
                                    className="min-h-[2.5rem] resize-none"
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm">{errors.content.message}</p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                size="icon"
                                className="h-10 w-10"
                                disabled={isLoading}
                            >
                                {isLoading ? <Circle className="h-4 w-4 animate-spin"/>: <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {post.comments?.map((comment, index) => (
                            <div key={index} className="flex gap-4">
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                    <Image
                                        src={comment.user.image || ""}
                                        alt={comment.user.name}
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </Avatar>
                                <div className="flex-1 bg-muted p-3 rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm">
                                            {comment.user.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {timeAgo(comment.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                            </div>
                        ))}

                        {/* Empty State */}
                        {(!post.comments || post.comments.length === 0) && (
                            <div className="flex items-center text-sm justify-center gap-4 text-center text-muted-foreground py-2">
                                <MessageSquare className="h-4 w-4 opacity-50" />
                                <p>No comments yet. Be the first to comment!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Card>
    )
}

export default PostCard
