import { findByUsername, findByEmail, createProfile} from "../../../../../prisma/profileQueries";

export async function POST(request: Request) {
    const formData = await request.formData()
    const email = formData.get("email")
    const username = formData.get("username")
    const password = formData.get("password")

    if (await findByUsername(username)) {
        return Response.json({
            error: true,
            message: "Username is taken",
            status: 400,
        })
    }

    if (await findByEmail(email)) {
        return Response.json({
            error: true,
            message: "Email is already in use",
            status: 400,
        })
    }

    await createProfile(username, email, password)
    
    return Response.json({
        error: false,
        message: "Profile creation success",
        status: 200,
    })
}