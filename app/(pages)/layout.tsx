import React from 'react'
import Footer from '../components/footer'
import { auth } from '@/auth'

async function layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    return (
        <>
            {children}
            {session && <Footer/>}
        </>
    )
}

export default layout
