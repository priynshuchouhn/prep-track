'use client';
import { Home, Search, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import AddPostButton from "@/components/ui/add-post-button";
import { usePathname } from "next/navigation";


function Footer() {
    const router = usePathname();
    const hideFooter = router.startsWith("/chat/");
    if(hideFooter) return null
    return (
        <div className="bg-white fixed bottom-0 lg:hidden flex items-center justify-around p-3 w-full shadow-md shadow-gray-900 border-t border-gray-300">
            <Link href="/">
                <Home className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
            <button>
                <Search className="w-7 h-7 text-gray-700 hover:text-black" />
            </button>
            <AddPostButton/>
            <Link href="/chat">
                <MessageSquare className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
            <Link href="/">
                <User className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
        </div>
    );
}

export default Footer;
