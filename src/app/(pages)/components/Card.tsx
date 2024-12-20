import Link from "next/link";
import CardActions from "@/app/(pages)/components/CardActions.tsx";
import React from "react";

export default function Card({
                         id,
                         title,
                         description,
                         createdAt,
    showActions,
                         isShown,
    setToDelete,
                     }: {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    showActions: boolean
    isShown: boolean,
    setToDelete: React.Dispatch<React.SetStateAction<string>>
}) {
    const date = new Date(createdAt);
    const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return (
        <div key={id} className="flex justify-between">
            <article className="flex max-w-xl flex-col items-start">
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={formatted} className="text-gray-500">
                        {formatted}
                    </time>
                </div>
                <div className="group relative">
                    <h3 className="mt-1 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link href={`/post/${id}`}>
                            <span className="absolute inset-0"/>
                            {title}
                        </Link>
                    </h3>
                    <p className="line-clamp-3 text-sm/6 text-gray-600">{description}</p>
                </div>
            </article>
            { showActions
                ? <CardActions id={id} isShown={isShown} setToDeleteAction={setToDelete}/>
                : <div></div>
            }
        </div>
    )
}