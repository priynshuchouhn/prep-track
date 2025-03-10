import React from 'react'
import Footer from '../components/footer'
import LeftSidebar from '../components/left-sidebar'
import RightSidebar from '../components/right-sidebar'
import Navbar from '@/components/ui/nav-bar'

async function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="min-h-screen bg-background">
                {/* Navbar */}
                <Navbar isHomePage={true} />
                <div className="mx-auto px-2 md:px-8 pt-4 pb-12 md:pt-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Left Sidebar */}
                        <LeftSidebar />
                        {/* Main Content */}
                        <div className="md:col-span-6">
                            {children}
                        </div>
                        {/* Right Sidebar */}
                        <RightSidebar />
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default layout
