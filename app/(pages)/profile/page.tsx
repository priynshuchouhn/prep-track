"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BookOpen,
    Trophy,
    Calendar,
    Star,
    TrendingUp,
    Users,
    BookMarked,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Briefcase,
    GraduationCap,
    BarChart3,
    MessageSquare,
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const activityData = [
    { date: "Mon", posts: 4 },
    { date: "Tue", posts: 3 },
    { date: "Wed", posts: 5 },
    { date: "Thu", posts: 2 },
    { date: "Fri", posts: 6 },
    { date: "Sat", posts: 4 },
    { date: "Sun", posts: 3 },
];

const achievements = [
    {
        id: 1,
        title: "DSA Master",
        description: "Completed 100 DSA problems",
        icon: Trophy,
        progress: 85,
    },
    {
        id: 2,
        title: "System Design Pro",
        description: "Mastered distributed systems concepts",
        icon: BookOpen,
        progress: 70,
    },
    {
        id: 3,
        title: "Consistent Learner",
        description: "30-day learning streak",
        icon: Calendar,
        progress: 100,
    },
];

const recentPosts = [
    {
        id: 1,
        title: "Understanding Time Complexity",
        topic: "DSA",
        likes: 24,
        comments: 5,
        date: "2 days ago",
    },
    {
        id: 2,
        title: "Microservices Architecture",
        topic: "System Design",
        likes: 32,
        comments: 8,
        date: "4 days ago",
    },
    {
        id: 3,
        title: "React Performance Tips",
        topic: "Frontend",
        likes: 18,
        comments: 3,
        date: "1 week ago",
    },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("overview");
    if (true) return null;
    return (
        <div className="min-h-screen bg-background pt-16">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-background">
                            <Image
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"
                                alt="Profile"
                                className="object-cover"
                                width={500}
                            />
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold mb-1">John Doe</h1>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>San Francisco, CA</span>
                                        <span className="text-muted-foreground/60">•</span>
                                        <Briefcase className="h-4 w-4" />
                                        <span>Software Engineer</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 md:ml-auto">
                                    <Button variant="outline" size="sm">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Message
                                    </Button>
                                    <Button size="sm">
                                        <Users className="h-4 w-4 mr-2" />
                                        Follow
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">
                                    <Star className="h-3 w-3 mr-1 text-yellow-500" />
                                    Top Contributor
                                </Badge>
                                <Badge variant="secondary">
                                    <Trophy className="h-3 w-3 mr-1 text-purple-500" />
                                    90-Day Streak
                                </Badge>
                                <Badge variant="secondary">
                                    <BookOpen className="h-3 w-3 mr-1 text-blue-500" />
                                    DSA Expert
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">About</h3>
                            <div className="space-y-4 text-sm">
                                <p className="text-muted-foreground">
                                    Passionate software engineer focused on building scalable web applications.
                                    Currently preparing for technical interviews and sharing my learning journey.
                                </p>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span>Computer Science, Stanford University</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span>Software Engineer at Tech Corp</span>
                                </div>
                                <div className="pt-4 flex items-center gap-3">
                                    <a href="#" className="text-muted-foreground hover:text-foreground">
                                        <Github className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="text-muted-foreground hover:text-foreground">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold mb-4">Statistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-muted rounded-lg text-center">
                                    <div className="text-2xl font-bold">156</div>
                                    <div className="text-sm text-muted-foreground">Posts</div>
                                </div>
                                <div className="p-4 bg-muted rounded-lg text-center">
                                    <div className="text-2xl font-bold">2.1k</div>
                                    <div className="text-sm text-muted-foreground">Followers</div>
                                </div>
                                <div className="p-4 bg-muted rounded-lg text-center">
                                    <div className="text-2xl font-bold">90</div>
                                    <div className="text-sm text-muted-foreground">Day Streak</div>
                                </div>
                                <div className="p-4 bg-muted rounded-lg text-center">
                                    <div className="text-2xl font-bold">45</div>
                                    <div className="text-sm text-muted-foreground">Achievements</div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="p-6">
                            <h3 className="font-semibold flex items-center gap-2 mb-4">
                                <BarChart3 className="h-5 w-5" />
                                Activity Overview
                            </h3>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={activityData}>
                                        <defs>
                                            <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#6b7280" />
                                        <YAxis stroke="#6b7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#1f2937",
                                                border: "none",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="posts"
                                            stroke="#8b5cf6"
                                            fillOpacity={1}
                                            fill="url(#colorPosts)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold flex items-center gap-2 mb-4">
                                <Trophy className="h-5 w-5" />
                                Achievements
                            </h3>
                            <div className="space-y-4">
                                {achievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                            <achievement.icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium">{achievement.title}</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {achievement.progress}%
                                                </span>
                                            </div>
                                            <Progress value={achievement.progress} className="h-2" />
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-semibold flex items-center gap-2 mb-4">
                                <BookMarked className="h-5 w-5" />
                                Recent Posts
                            </h3>
                            <div className="space-y-4">
                                {recentPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium mb-1">{post.title}</h4>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Badge variant="secondary">{post.topic}</Badge>
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4" />
                                                {post.likes}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="h-4 w-4" />
                                                {post.comments}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}