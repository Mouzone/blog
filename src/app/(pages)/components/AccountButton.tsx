import React from "react";

export default function AccountButton({text}: {text: string})
{
    return <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
    >
        {text}
    </button>
}