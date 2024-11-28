"use client"
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function CardActions({id, isShown, setToDeleteAction}: {id: string, isShown: boolean, setToDeleteAction: React.Dispatch<React.SetStateAction<string>>}) {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(isShown)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    const deletePost = async () => {
        await fetch(`/api/posts/${id}/delete`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${Cookies.get("accessToken")}`
            },
        })
        setToDeleteAction(id)
    }

    const toggleShown = async () => {
        await fetch(`/api/posts/${id}/toggle-shown`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${Cookies.get("accessToken")}`
            },
            body: JSON.stringify({
                isShown: !isShown,
            })
        })
        setEyeOpen(!eyeOpen)
    }

    return <div className="flex flex-col justify-center">
            <button
                onClick={() => router.push(`/post-form/?postId=${id}`)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>square-edit-outline</title>
                    <path
                        d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"/>
                </svg>
            </button>

            <button
                onClick={() => toggleShown()}
            >
                {eyeOpen
                    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                        <path
                            d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"/>
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                        <path
                            d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"/>
                    </svg>
                }
            </button>

            <button
                onClick={() => deletePost()}
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6 fill-red-600"
                     viewBox="0 0 24 24">
                    <path
                        d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                </svg>
            </button>
        </div>
}