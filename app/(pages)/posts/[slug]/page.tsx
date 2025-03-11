import PostCard from '@/components/ui/post-card'
import { API_BASE_URL } from '@/lib/utils'
import { Post, User } from '@prisma/client'
import axios from 'axios'
import { Metadata } from 'next'
import React from 'react'

type PostType = Post & { user: User}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params
    const res = await axios.get(`${API_BASE_URL}/posts/${slug}`)
    const post: PostType  = res.data

    return {
        title: post.content,
        description: post.content || 'Read this amazing post on our platform.',
        keywords: post.tags ? post.tags.join(', ') : '',
        authors: post.user.name ? [{ name: post.user.name }] : [],
        publisher: 'Prep Track',
        robots: 'index, follow',
        alternates: {
            canonical: `${API_BASE_URL}/posts/${slug}`,
        },
        openGraph: {
            title: post.content,
            description: post.content,
            url: `${API_BASE_URL}/posts/${slug}`,
            siteName: 'Your Website Name',
            images: post.user.image ? [{ url: post.user.image, alt: post.content }] : [],
            type: 'article',
            publishedTime: `${post.createdAt}`,
            modifiedTime: `${post.updatedAt}`,
            authors: post.user.name ? [post.user.name] : [],
            section: post.tags[0] || 'General',
            tags: post.tags || []
        },
        twitter: {
            card: 'summary_large_image',
            title: post.content,
            description: post.content,
            images: post.user.image ? [post.user.image] : [],
        },
    }
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const res = await axios.get(`${API_BASE_URL}/posts/${slug}`)
    const post = res.data
    
    return <PostCard post={post} />
}

export default Page
