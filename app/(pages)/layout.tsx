import React from 'react'
import Footer from '../components/footer'

async function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer/>
        </>
    )
}

export default layout
