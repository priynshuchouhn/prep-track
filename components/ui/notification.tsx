'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";
import { Notification } from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react";
import { Button } from "./button";


export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/notifications`);
                setNotifications(res.data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async () => {
        try {
            await axios.post(`${API_BASE_URL}/notifications/read`);
            setNotifications([]); // Clear notifications after marking as read
        } catch (error) {
            console.error("Failed to mark notifications as read", error);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="relative">
                    <Bell className="h-6 w-6" />
                    {notifications.length > 0 && <div className="absolute w-5 h-5 flex items-center text-xs -top-2 -right-2 justify-center text-white bg-sky-700 rounded-full">{notifications.length}</div>}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-md">
                    <DropdownMenuLabel>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">Notification</span>
                            <Button variant={"link"} onClick={markAsRead}  className="text-xs">
                                Mark All as Read
                            </Button>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                        <>
                            {notifications.map((notification) => (
                                <DropdownMenuItem key={notification.id}>
                                    {notification.message}
                                </DropdownMenuItem>
                            ))}
                        </>
                    ) : (
                        <DropdownMenuItem>No new notifications</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
