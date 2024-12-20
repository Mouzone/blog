import React from "react";

export default function Header({text}: {text: string}) {
    return <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {text}
        </h2>
    </div>
}
