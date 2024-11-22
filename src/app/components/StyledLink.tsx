import Link from "next/link";
import React from "react";

export function StyledLink({ href, text }: { href: string, text: string }) {
    return <Link
        href={ href }
        className="text-white bg-purple-900 rounded-md px-3 py-2 text-sm font-medium"
    >
        { text }
    </Link>
}