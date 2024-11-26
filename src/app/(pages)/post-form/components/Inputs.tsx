import TextInput from "@/app/(pages)/post-form/components/TextInput.tsx";
import TextArea from "@/app/(pages)/post-form/components/TextArea.tsx";
import React from "react";

export default function Inputs({title, setTitle, description, setDescription, content, setContent}:
                                   {title: string, setTitle: React.Dispatch<React.SetStateAction<string>>,
                                       description: string, setDescription: React.Dispatch<React.SetStateAction<string>>,
                                       content: string, setContent: React.Dispatch<React.SetStateAction<string>>
                                   }) {
    return <div className="space-y-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <TextInput value={title} label="title" setState={setTitle}/>
            <TextInput value={description} label="description" setState={setDescription}/>
            <TextArea value={content} label="content" setState={setContent}/>
        </div>
    </div>
}
