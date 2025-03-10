import Navbar from "@/components/ui/nav-bar";
import CreatePostForm from "@/components/ui/create-post-form";
import Feed from "@/components/ui/feed";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";


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

export default async function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar isHomePage={true} />

      <div className="mx-auto px-2 md:px-8 pt-4 pb-12 md:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
         <LeftSidebar/>

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
        <RightSidebar/>
        </div>
      </div>
    </div>
  );
}