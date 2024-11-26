import React from "react";

export default function TextInput({value, label, setState}: {value: string, label: string, setState: React.Dispatch<string>}) {
    return <div className="sm:col-span-4">
        <label htmlFor={label} className="block text-sm/6 font-medium text-gray-900">
            {label.at(0)?.toUpperCase() + label.substring(1)}
        </label>
        <div className="mt-2">
            <div
                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                    id={label}
                    name={label}
                    type="text"
                    autoComplete={value}
                    value={value}
                    onChange={(e) => setState(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                />
            </div>
        </div>
    </div>
}