import {headers} from "next/headers";

export async function GET(){
    const headersList = await headers()

    return Response.json(
        {
            id: headersList.get("id"),
            deez: headersList.get("deez")
        }
    )
}

export async function POST() {

}