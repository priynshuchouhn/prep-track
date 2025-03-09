import { Button } from "@/components/ui/button";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";
import Link from "next/link";

function Footer() {
    return (
        <div className="bg-white fixed bottom-0 lg:hidden flex items-center justify-around p-3 w-full shadow-md shadow-gray-900 border-t border-gray-300">
            <Link href="/">
                <Home className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
            <button>
                <Search className="w-7 h-7 text-gray-700 hover:text-black" />
            </button>
            <button className="">
                    <PlusCircle className="w-10 h-10 text-gray-700 hover:text-black" />
                </button>
            {/* <div className="relative w-8 h-8">
                <button className="absolute -translate-x-[20%] -translate-y-[60%] bg-white p-2 rounded-full shadow-md">
                    <PlusCircle className="w-12 h-12 text-gray-500 hover:text-black" />
                </button>
            </div> */}
            <Link href="/">
                <Bell className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
            <Link href="/">
                <User className="w-7 h-7 text-gray-700 hover:text-black" />
            </Link>
        </div>
    );
}

export default Footer;
