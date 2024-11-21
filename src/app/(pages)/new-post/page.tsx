"use client"
import React, {type FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

export default function NewPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const router = useRouter()

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/posts/create",
                {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        content
                    })
                })
            const data = await response.json()
            if (data["error"]) {
                throw new Error("Error creating new point")
            }
            router.push("/")
        } catch(error) {
            console.error("Error sending request", error)
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <TextInput value={title} label="title" setState={setTitle}/>
                        <TextInput value={description} label="description" setState={setDescription}/>
                        <TextArea value={content} label="content" setState={setContent}/>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
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
                    Post
                </button>
            </div>
        </form>
    )
}

function TextInput({value, label, setState}: {value: string, label: string, setState: React.Dispatch<string>}) {
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

// todo: some errorr with this one being controlled or uncontrolled
function TextArea({value, label, setState}: { value: string, label: string, setState: React.Dispatch<string>}) {
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
                defaultValue={''}
            />
        </div>
    </div>
}
