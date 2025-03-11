'use client';
import { Home, Search, User, MessageSquare, Settings, LogOut,  Trophy, HelpCircle, } from "lucide-react";
import Link from "next/link";
import AddPostButton from "@/components/ui/add-post-button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignOutButton from "@/components/ui/signout-button";

const menuItems = [
    {
      icon: User,
      label: "Profile",
      href: "/",
    },
    // {
    //   icon: Bell,
    //   label: "Notifications",
    //   href: "/notifications",
    // },
    // {
    //   icon: BookOpen,
    //   label: "My Learning",
    //   href: "/learning",
    // },
    {
      icon: Trophy,
      label: "Achievements",
      href: "/",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/",
    },
  ];


function Footer() {
    const router = usePathname();
    const hideFooter = router.startsWith("/chat/");
    if (hideFooter) return null
    return (
        <div className="bg-white fixed bottom-0 lg:hidden flex items-center justify-around p-3 w-full shadow-md shadow-gray-900 border-t border-gray-300">
            <Link href="/">
                <Home className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
            <button>
                <Search className="w-7 h-7 text-gray-700 hover:text-black" />
            </button>
            <AddPostButton />
            <Link href="/chat">
                <MessageSquare className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <User className="w-7 h-7 text-gray-700 hover:text-black" />
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px]" side="left">
                    <SheetHeader className="pb-6">
                        <SheetTitle>
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <Image
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
                                        alt="Profile"
                                        className="object-cover"
                                        width={500}
                                        height={500}
                                    />
                                </Avatar>
                                <div>
                                    <h2 className="text-lg font-semibold">John Doe</h2>
                                    <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                                </div>
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="space-y-6">
                        {menuItems.map((item) => (
                            <Link key={item.label} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-lg hover:bg-muted"
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                        <SignOutButton/>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Footer;

