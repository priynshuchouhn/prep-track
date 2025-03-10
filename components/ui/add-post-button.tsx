'use client'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PlusCircle } from 'lucide-react';
import CreatePostForm from './create-post-form';

function AddPostButton() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger onClick={() => setOpen(true)}>
                <PlusCircle className="w-10 h-10 text-gray-700 hover:text-black" />
            </SheetTrigger>
            <SheetContent side="bottom" className="h-full">
                <SheetHeader>
                    <SheetTitle className="text-2xl">Post an update</SheetTitle>
                    <SheetDescription>
                        <CreatePostForm rows={15} className="h-[80vh] overflow-y-auto" onPostSubmit={() => setOpen(false)} />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default AddPostButton
