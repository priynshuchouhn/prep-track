import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    MoreVertical,
    Search,
    BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";



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

export default function ChatPage() {
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
                            <div className="space-y-2">
                                {onlineUsers.map((user) => (
                                    <Link href={`/chat/${user.id}`} key={user.id}>
                                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer">
                                            <div className="relative">
                                                <Avatar>
                                                    <Image src={user.avatar} alt={user.name} width={500} height={500} />
                                                </Avatar>
                                                {user.status === "online" && (
                                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-muted-foreground truncate">
                                                    {user.lastSeen}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </Card>
                </div>
            </div>
        </div>
    );
}