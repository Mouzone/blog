import { getToken } from "../../../../utility/getToken.ts";

export async function POST(request: Request) {
    const { username, password } = await request.json()

    if (username !== process.env["USERNAME"] && password !== process.env["PASSWORD"]) {
        return Response.json({
            error: true,
            status: 401,
            message: 'Invalid credentials'
        })
    }

    try {
        const accessToken = await getToken({ })

        return Response.json({
            error: false,
            status: 200,
            accessToken,
            message: "success"
        })
    } catch(error) {
        return Response.json({
            error: true,
            status: 503,
            message: `Error generating token ${error}`
        })
    }
}