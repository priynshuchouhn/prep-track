'use client';
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { API_BASE_URL, timeAgo, WS_BASE_URL } from '@/lib/utils';
import { Message, User } from '@prisma/client';
import { ChevronLeft, Circle, Paperclip, Phone, Send, Smile, Users, Video } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { io } from "socket.io-client";
import { getSocket, initializeWebSocket } from '@/lib/websocket';



const messageSchema = z.object({
    content: z.string().min(1, "Message cannot be empty").max(500, "Message is too long"),
});

type MessageFormData = z.infer<typeof messageSchema>;
type MessageType = Message & { isSender: boolean, sender: User }
function ChatMessagePage() {
    const pathname = usePathname();
    const session = useSession();
    const chatId = pathname.split('/')[2];
    const [messages, setMessages] = useState<MessageType[]>([]);
    const[isLoading, setIsLoading] = useState<boolean>(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/chat/${chatId}`);
                const formattedMessage = (res.data.messages as any).map((msg: any) => ({ ...msg, isSender: msg.senderId == session.data?.user.id }))
                setMessages(formattedMessage);
                setUser(res.data.user);
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };
        fetchMessages();
    }, [chatId, session.data?.user.id]);
    useEffect(() => {
        if(session.data?.user.id){
            initializeWebSocket(`${WS_BASE_URL}`, session.data?.user.id);
            const socket = getSocket();
            socket.on("connect", () => {
                if (session.data?.user.id) {
                    socket.emit("joinChat", session.data?.user.id);
                }
            });
    
            // Listen for incoming messages
            socket.on("newMessage", (message: MessageType) => {
                setMessages((prev) => [...prev, { ...message, isSender: message.senderId == session.data?.user.id }]);
            });
        }
        return () => {
            // socket.off("newMessage");
        };
    }, [chatId, session.data?.user.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MessageFormData>({
        resolver: zodResolver(messageSchema),
    });

    const sendMessage = async (data: MessageFormData) => {
        if (!data.content.trim()) return;
        setIsLoading(true);
        const messageData = {
            content: data.content,
        };
        try {
            await axios.post(`${API_BASE_URL}/chat/${chatId}/messages`, messageData);
            reset(); // Reset input field after sending
            setIsLoading(false);
        } catch (error) {
            console.error("Error sending message", error);
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Main Chat Area */}
            <Card className="flex flex-col h-[85vh] md:h-[calc(100vh-120px)] py-3">
                {/* Chat Header */}
                <div className="px-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={"/chat"}>
                            <ChevronLeft className='h-7 w-7 cursor-pointer' />
                        </Link>
                        {user && <>
                            <Avatar>
                                <Image src={user?.image || ""} alt={user?.name || "Image of user"} width={500} height={500} />
                            </Avatar>
                            <div>
                                <div className="font-medium">{user?.name}</div>
                                {/* <div className="text-sm text-muted-foreground">
                                {onlineUsers[0].lastSeen}
                            </div> */}
                            </div>
                        </>}
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
                <ScrollArea className="flex-1 p-4 h-[60vh] md:h-[65vh]">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id} className={`flex items-start gap-3 ${message.isSender ? "flex-row-reverse" : ""}`}>
                                <Avatar>
                                    <Image src={message.sender.image || ""} alt={message.sender.name} width={500} height={500} />
                                </Avatar>
                                <div className={`flex flex-col ${message.isSender ? "items-end" : ""}`}>
                                    <div className={`px-4 py-2 rounded-lg max-w-md ${message.isSender
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                        }`}>
                                        {message.content}
                                    </div>
                                    <span className="text-xs text-muted-foreground mt-1">
                                        {timeAgo(message.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
                {/* Message Input */}
                <div className="p-4 border-t">
                    <form onSubmit={handleSubmit(sendMessage)} className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input
                            placeholder="Type a message..."
                            {...register("content")}
                            className="flex-1"
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm">{errors.content.message}</p>
                        )}
                        <Button variant="ghost" size="icon">
                            <Smile className="h-5 w-5" />
                        </Button>
                        <Button size="icon" type="submit" disabled={isLoading}>
                            {isLoading ? <Circle className="h-5 w-5 animate-spin"/>: <Send className="h-5 w-5" />}
                        </Button>
                    </form>
                </div>
            </Card>
        </>
    )
}

export default ChatMessagePage
