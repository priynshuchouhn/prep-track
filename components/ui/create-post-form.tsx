"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "./card";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Plus, X } from "lucide-react";
import { Badge } from "./badge";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./command";
import { API_BASE_URL, cn } from "@/lib/utils";
import axios from "axios";
import { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";

// ✅ Schema Validation using Zod
const postSchema = z.object({
  content: z.string().min(1, "Post content cannot be empty").max(500, "Post is too long"),
  tags: z.array(z.string()).max(1, "Maximum 1 topics allowed").min(1,"Please select a topic"),
});

type PostFormData = z.infer<typeof postSchema>;



// ✅ Props for className & rows only
interface CreatePostFormProps {
  className?: string;
  rows?: number;
  onPostSubmit? : () => void
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ className, rows = 3, onPostSubmit }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [topics,setTopics] = useState<Tag[]>([])
  const router = useRouter();
  useEffect(()=>{
    const fetchTags = async () => {
      const res = await axios.get(`${API_BASE_URL}/tags`);
      const data = res.data
      setTopics(data)
    }
    fetchTags();
  },[])
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: { content: "", tags: [] },
  });

  const tags = watch("tags");

  // ✅ Add Tag
  const handleTagSelect = (tag: string) => {
    if (tags.length >= 1) return;
    setValue("tags", [...tags, tag], { shouldValidate: true });
    setOpen(false);
  };

  // ✅ Remove Tag
  const removeTag = (tag: string) => {
    setValue("tags", tags.filter(t => t !== tag), { shouldValidate: true });
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/posts`, data);
      reset();
      onPostSubmit?.()
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error posting update. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("p-6 mb-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          placeholder="Share your learning update..."
          className="mb-2"
          rows={rows}
          {...register("content")}
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

        <div className="flex flex-col space-y-4 mt-2">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 space-x-1">
                <span>{tag}</span>
                <button type="button" className="ml-1 hover:text-destructive" onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {tags.length < 1 && (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="h-7 px-2 text-muted-foreground">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Topic
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search topics..." />
                    <CommandList>
                      <CommandEmpty>No topic found.</CommandEmpty>
                      <CommandGroup>
                        {topics
                          .filter((topic:Tag) => !tags.includes(topic.name))
                          .map((topic:Tag) => (
                            <CommandItem key={topic.name} value={topic.name} onSelect={() => handleTagSelect(topic.name)}>
                              {topic.name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
          {errors.tags && <p className="text-red-500 text-sm block">{errors.tags.message}</p>}
          <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Update"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CreatePostForm;
