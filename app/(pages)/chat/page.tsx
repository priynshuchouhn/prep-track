'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    MoreVertical,
    Search,
    BookOpen,
    SeparatorHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Chat, User } from "@prisma/client";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


type ChatsType = Chat & { user: User }

export default function ChatPage() {
    const [chats, setChats] = useState<ChatsType[]>([]);
    const session = useSession();
    const [usersForChat, setUserForChat] = useState<User[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchChats = async () => {
            const resChat = await axios.get(`${API_BASE_URL}/chat`);
            const chats = resChat.data;
            const resUser = await axios.get(`${API_BASE_URL}/users/available`);
            const users: User[] = resUser.data
            if (chats.length > 0) {
                const formattedChats: ChatsType[] = chats.map((chat: any) => ({ ...chat, user: chat.user1Id == session.data?.user.id ? chat.user2 : chat.user1 }))
                const newChatUser = users.filter(user => !formattedChats.some(chat => chat.user.id === user.id));
                setUserForChat(newChatUser);
                setChats(formattedChats);
            } else {
                setUserForChat(users);
                setChats(chats);
            }
        }
        fetchChats();
    }, [session.data?.user.id])

    const startChat = async (receiverId: string) => {
        try {
            const resChat = await axios.post(`${API_BASE_URL}/chat`, { receiverId });
            const chat: Chat = resChat.data
            router.push(`/chat/${chat.id}`);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen bg-background">
            <div className=" mx-auto md:px-4">
                <div className="">
                    <Card className="p-4 h-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-6 w-6" />
                                <span className="font-bold text-lg">Messages</span>
                            </div>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search messages"
                                className="pl-9"
                            />
                        </div>
                        <ScrollArea className="h-[70vh]">
                            {chats.length > 0 ?
                                <>
                                    <div className="space-y-2 bg-gray-50">
                                        {chats.map((chat) => (
                                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer" key={chat.user.id} onClick={() => startChat(chat.user.id)}>
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12">
                                                        <Image src={chat.user.image || ""} alt={chat.user.name} width={500} height={500} className="object-cover" />
                                                    </Avatar>
                                                    {/* {chat.user.status === "online" && (
                                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                                                )} */}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold">{chat.user.name}</div>
                                                    {/* <div className="text-sm text-muted-foreground truncate">
                                                    {user.lastSeen}
                                                </div> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator />
                                    <p className="text-primary font-semibold my-5">Start a new chat</p>
                                    {usersForChat.map((user) => (
                                        <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer" onClick={() => startChat(user.id)}>
                                            <div className="relative">
                                                <Avatar>
                                                    <Image src={user.image || ""} alt={user.name} width={500} height={500}  className="object-cover"/>
                                                </Avatar>
                                                {/* {chat.user.status === "online" && (
                                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                                                )} */}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium">{user.name}</div>
                                                {/* <div className="text-sm text-muted-foreground truncate">
                                                    {user.lastSeen}
                                                </div> */}
                                            </div>
                                        </div>
                                    ))}
                                </>
                                : <>
                                    <div className="flex items-center justify-center h-full ">
                                        <p className="text-muted-foreground mb-3">
                                            No chats found, Start new chat now
                                        </p>
                                    </div>
                                    <Separator />
                                    {usersForChat.map((user) => (
                                        <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer" onClick={() => startChat(user.id)}>
                                            <div className="relative">
                                                <Avatar>
                                                    <Image src={user.image || ""} alt={user.name} width={500} height={500}  className="object-cover" />
                                                </Avatar>
                                                {/* {chat.user.status === "online" && (
                                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                                                )} */}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium">{user.name}</div>
                                                {/* <div className="text-sm text-muted-foreground truncate">
                                                    {user.lastSeen}
                                                </div> */}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                        </ScrollArea>
                    </Card>
                </div>
            </div>
        </div>
    );
}