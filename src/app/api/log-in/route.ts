import { getToken } from "../../../../utility/getToken.ts";

export async function POST(request: Request) {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    if (username !== process.env["USERNAME"] && password !== process.env["PASSWORD"]) {
        return Response.json({
            error: true,
            status: 401,
            message: 'Invalid credentials'
        })
    }

    try {
        const accessToken = await getToken({ }, "1h")

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