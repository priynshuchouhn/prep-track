import { auth } from '@/auth';
import React from 'react'
import Footer from './footer';

async function FooterWrapper() {
    const session = await auth()
    if (!session) return null;
    return <Footer/>
}

export default FooterWrapper
