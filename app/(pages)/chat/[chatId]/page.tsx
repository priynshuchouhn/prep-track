'use client';
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft, Paperclip, Phone, Send, Smile, Users, Video } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const messages = [
    {
        id: 1,
        sender: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
        },
        content: "Hey! How's your interview prep going?",
        timestamp: "10:30 AM",
        isSender: false,
    },
    {
        id: 2,
        sender: {
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
        },
        content: "It's going well! Just finished reviewing system design patterns. Working on distributed systems concepts now.",
        timestamp: "10:32 AM",
        isSender: true,
    },
    {
        id: 3,
        sender: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
        },
        content: "That's great! Would you like to do a mock interview session tomorrow?",
        timestamp: "10:33 AM",
        isSender: false,
    },
    {
        id: 4,
        sender: {
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
        },
        content: "Yes, that would be really helpful! What time works for you?",
        timestamp: "10:35 AM",
        isSender: true,
    },
];
const onlineUsers = [
    {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
        status: "online",
        lastSeen: "Active now",
    },
    {
        id: 2,
        name: "Alex Kumar",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100",
        status: "online",
        lastSeen: "Active now",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100",
        status: "offline",
        lastSeen: "2h ago",
    },
];
function ChatPage() {
    const [newMessage, setNewMessage] = useState("");

    return (
        <>
            {/* Main Chat Area */}
            <Card className="flex flex-col h-[80vh] md:h-[calc(100vh-120px)] py-3">
                {/* Chat Header */}
                <div className="px-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={"/chat"}>
                        <ChevronLeft className='h-7 w-7 cursor-pointer'/>
                        </Link>
                        <Avatar>
                            <Image src={onlineUsers[0].avatar} alt={onlineUsers[0].name} width={500} height={500} />
                        </Avatar>
                        <div>
                            <div className="font-medium">{onlineUsers[0].name}</div>
                            <div className="text-sm text-muted-foreground">
                                {onlineUsers[0].lastSeen}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Phone className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Video className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Users className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start gap-3 ${message.isSender ? "flex-row-reverse" : ""
                                    }`}
                            >
                                <Avatar>
                                    <Image src={message.sender.avatar} alt={message.sender.name} width={500} height={500} />
                                </Avatar>
                                <div
                                    className={`flex flex-col ${message.isSender ? "items-end" : ""
                                        }`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-lg max-w-md ${message.isSender
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                    <span className="text-xs text-muted-foreground mt-1">
                                        {message.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                {/* Message Input */}
                <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1"
                        />
                        <Button variant="ghost" size="icon">
                            <Smile className="h-5 w-5" />
                        </Button>
                        <Button size="icon">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default ChatPage
