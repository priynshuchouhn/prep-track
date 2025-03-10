import React from 'react'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  TrendingUp,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import axios from 'axios';
import { API_BASE_URL } from '@/lib/utils';
import { Leaderboard, Tag, User } from '@prisma/client';

type LeaderboardUser = Leaderboard & {user: User}
async function RightSidebar() {
    const resLeaderboard = await axios.get(`${API_BASE_URL}/leaderboard`, {
        params: {
          limit: 3
        }
      });
      const resTag = await axios.get(`${API_BASE_URL}/tags`);
      const trendingTopics: Tag[] = resTag.data
      const leaderboardUsers: LeaderboardUser[]  = resLeaderboard.data
  return (
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
                      key={topic.name}
                      className="flex items-center justify-between hover:bg-muted p-2 rounded-lg cursor-pointer"
                    >
                      <span>{topic.name}</span>
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
                  {leaderboardUsers.map((performer) => (
                    <div
                      key={performer.user.id}
                      className="flex items-center space-x-3 hover:bg-muted p-2 rounded-lg cursor-pointer"
                    >
                      <Avatar>
                        <Image src={performer.user.image || ""} alt={performer.user.name} width={500} height={500} className="object-cover" />
                      </Avatar>
                      <div>
                        <div className="font-semibold">{performer.user.name}</div>
                        <div className="text-xs text-muted-foreground bg-gray-100 p-1 rounded-2xl w-max">
                           {performer.rank} Rank 🏆 • {performer.streak} Day 🔥
                        </div>
                        {/* <div className="text-xs text-muted-foreground">
                           {performer.postCount} Posts 📝 
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
  )
}

export default RightSidebar
