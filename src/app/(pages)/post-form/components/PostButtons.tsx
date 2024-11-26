import React from "react";
import {router} from "next/client";

export default function PostButtons({ text }: { text: string}) {
    return <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
            type="button" className="text-sm/6 font-semibold text-gray-900"
            onClick={() => router.push("/")}
        >
            Cancel
        </button>
        <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            { text }
        </button>
    </div>
}