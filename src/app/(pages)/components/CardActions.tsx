"use client"
import Cookies from "js-cookie";

export default function CardActions({id, isShown}: {id: string, isShown: boolean}) {
    const deletePost = async () => {
        const response = await fetch(`http://localhost:3000/api/posts/${id}/delete`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${Cookies.get("accessToken")}`
            },
        })
        console.log(await response.json())
    }

    const toggleShown = async () => {
        const response = await fetch(`http://localhost:3000/api/posts/${id}/toggle-shown`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${Cookies.get("accessToken")}`
            },
            body: JSON.stringify({
                isShown: !isShown,
            })
        })
        console.log(await response.json())
    }

    return <div>
        {Cookies.get("accessToken") === undefined || (
            <div className="flex flex-col space-x-2">
                <button
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                    onClick={() => toggleShown()}
                >
                    {isShown
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
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                    onClick={() => deletePost()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24">
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                    </svg>
                </button>
            </div>
        )}
    </div>
}