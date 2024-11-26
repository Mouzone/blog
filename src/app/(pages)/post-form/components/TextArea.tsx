import React from "react";

export default function TextArea({value, label, setState}: { value: string, label: string, setState: React.Dispatch<string>}) {
    return <div className="col-span-full">
        <label htmlFor={label} className="block text-sm/6 font-medium text-gray-900">
            {label.at(0)?.toUpperCase() + label.substring(1)}
        </label>
        <div className="mt-2">
            <textarea
                id={label}
                name={label}
                rows={3}
                value={value}
                onChange={(e) => setState(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
        </div>
    </div>
}