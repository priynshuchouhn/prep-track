'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";
import { Notification } from "@prisma/client";
import { io } from "socket.io-client";

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
import clsx from "clsx";


export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [socket, setSocket] = useState<any>(null);
    console.log(notifications);


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/notifications`);
                setNotifications(res.data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            }
        };

        // Fetch notifications initially
        fetchNotifications();

        // Set up WebSocket connection
        const newSocket = io(API_BASE_URL);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket");
        });

        newSocket.on("newNotification", (notification) => {
            setNotifications((prev) => [notification, ...prev]);
        });

        // Polling fallback (fetch every 10 seconds)
        const interval = setInterval(fetchNotifications, 10000);

        return () => {
            newSocket.disconnect();
            clearInterval(interval);
        };
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
                    {notifications.filter(el => el.read != true) && notifications.filter(el => el.read != true).length > 0 && <div className="absolute w-5 h-5 flex items-center text-xs -top-2 -right-2 justify-center text-white bg-sky-700 rounded-full">{notifications.filter(el => el.read != true).length}</div>}
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
                                <DropdownMenuItem key={notification.id} className={clsx(!notification.read && 'bg-sky-50')}>
                                    <span className={clsx(!notification.read && 'font-semibold')}>{notification.message}</span>
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
