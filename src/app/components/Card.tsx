import Link from "next/link";

export function Card(id: string, title: string, description: string, dateString: string) {
    const date = new Date(dateString)
    const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return <article key={id} className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
            <time dateTime={formatted} className="text-gray-500">
                {formatted}
            </time>
        </div>
        <div className="group relative">
            <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                <Link href={`/${id}`}>
                    <span className="absolute inset-0"/>
                    {title}
                </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{description}</p>
        </div>
    </article>
}