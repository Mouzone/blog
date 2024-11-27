import React from "react";

export default function Input({ type, value, update }: { type: string, value: string, update: React.Dispatch<React.SetStateAction<string>> }) {
    return <div>
        <label htmlFor={type} className="block text-sm/6 font-medium text-gray-900">
            {type.at(0)?.toUpperCase() + type.substring(1)}
        </label>
        <div className="mt-2">
            <input
                id={type}
                name={type}
                type={type}
                value={value}
                onChange={(e) => update(e.target.value)}
                required
                autoComplete={type}
                className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm/6"
            />
        </div>
    </div>
}