import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@muzammil328/ui';
import { BlogPost } from '@/app/(main)/blogs/_components/BlogList';

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-4xl">📚</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="mb-1 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                        {post.category}
                    </span>
                    <span>{post.date}</span>
                </div>
                <CardTitle className="line-clamp-1 my-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-sm">{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-0">
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
                <Link
                    href={`/blogs/${post.slug}`}
                    className="link1 text-primary text-sm!"
                >
                    Read More →
                </Link>
            </CardFooter>
        </Card>
    );
}
