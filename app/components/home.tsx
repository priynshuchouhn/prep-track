import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  TrendingUp,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/ui/nav-bar";
import CreatePostForm from "@/components/ui/create-post-form";
import Feed from "@/components/ui/feed";

const dummyPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
      badge: "DSA Expert",
    },
    content: "Just completed my DSA practice for today! Making progress on binary trees 🌳\n\nKey learnings:\n- Tree traversal algorithms\n- Balanced vs unbalanced trees\n- Time complexity analysis",
    likes: 24,
    comments: 5,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100",
      badge: "System Design Pro",
    },
    content: "Finished system design chapter on distributed systems! 🚀\n\nKey points covered:\n- CAP theorem\n- Load balancing strategies\n- Database sharding",
    likes: 32,
    comments: 8,
    timestamp: "3 hours ago",
  },
];

const trendingTopics = [
  "System Design",
  "Dynamic Programming",
  "React Interview Questions",
  "Database Design",
  "Behavioral Interview Tips",
];

const topPerformers = [
  {
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
    streak: "45 days",
    topic: "Algorithms",
  },
  {
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100",
    streak: "42 days",
    topic: "System Design",
  },
];

export default function HomePage() {


  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar isHomePage={true} />

      <div className="mx-auto px-2 md:px-8 pt-4 pb-12 md:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-24">
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-6">
                  <Avatar className="h-12 w-12">
                    <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" alt="User" width={500} height={500} className="object-cover" />
                  </Avatar>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-muted-foreground">🔥 15 day streak</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold">45</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold">128</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-6">
            {/* Create Post */}
            <div className="hidden md:block">
              <CreatePostForm />
            </div>
            {/* Feed Tabs */}
           <Feed/>
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Trending Topics */}
              <Card className="p-3">
                <h3 className="font-semibold flex items-center mb-4">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center justify-between hover:bg-muted p-2 rounded-lg cursor-pointer"
                    >
                      <span>{topic}</span>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Performers */}
              <Card className="p-3">
                <h3 className="font-semibold flex items-center mb-4">
                  <Trophy className="h-4 w-4 mr-2" />
                  Top Performers
                </h3>
                <div className="space-y-4">
                  {topPerformers.map((performer) => (
                    <div
                      key={performer.name}
                      className="flex items-center space-x-3 hover:bg-muted p-2 rounded-lg cursor-pointer"
                    >
                      <Avatar>
                        <Image src={performer.avatar} alt={performer.name} width={500} height={500} className="object-cover" />
                      </Avatar>
                      <div>
                        <div className="font-semibold">{performer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          🔥 {performer.streak} • {performer.topic}
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
    </div>
  );
}