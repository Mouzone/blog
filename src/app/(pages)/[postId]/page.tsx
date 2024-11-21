"use client"
import {useParams} from "next/navigation";

export default function Post() {
    const { postId } = useParams()
    return <>
        {postId}
    </>
}

function Comments() {

}