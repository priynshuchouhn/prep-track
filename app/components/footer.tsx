import { auth } from "@/auth";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";
import Link from "next/link";

async function Footer() {
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
