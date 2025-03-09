'use client'
import React, { useState } from 'react'
import { Card } from './card';
import { Textarea } from './textarea';
import { Button } from './button';
import { BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';

function CreatePostForm({className, rows}: {className?:string, rows?: number}) {
  const [postContent, setPostContent] = useState("");
  return (
    <Card className={cn("p-2 md:p-6 md:mb-6 flex flex-col justify-between", className)}>
      <Textarea
        rows={rows}
        placeholder="Share your learning update..."
        className="mb-4"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BookMarked className="h-4 w-4 mr-2" />
            Topic
          </Button>
        </div>
        <Button>Post Update</Button>
      </div>
    </Card>
  )
}

export default CreatePostForm
