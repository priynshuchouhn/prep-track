import React from 'react'
import { Button } from './button'
import { LogOut } from 'lucide-react'
import { signOutUser } from '@/lib/actions/sign-out'

function SignOutButton() {
    return (
        <form action={signOutUser}>
            <Button type='submit' variant="ghost" className="w-full justify-start text-base hover:bg-destructive/10 text-destructive hover:text-destructive">
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
            </Button>
        </form>
    )
}

export default SignOutButton
