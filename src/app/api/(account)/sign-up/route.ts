import { createProfile, findProfileByUsername, findProfileByEmail } from "../../../../../prisma/profileQueries";

interface RegisterResponse {
    error: boolean
    status: number
    message: string
}

export async function POST(request: Request): Promise<Response> {
    try {
        const { username, email, password } = await request.json()

        // Check if username or email already exists
        const existingUsername = await findProfileByUsername(username)

        if (existingUsername) {
            return Response.json({
                error: true,
                status: 409, // Conflict
                message: 'Username already exists'
            })
        }

        const existingEmail = await findProfileByEmail(email)

        if (existingEmail) {
            return Response.json({
                error: true,
                status: 409, // Conflict
                message: 'Email already exists'
            })
        }

        // Hash password
        const passwordHash = await Bun.password.hash(password, {
            algorithm: "bcrypt",
            cost: 10
        })

        // Create account
        await createProfile(username, email, passwordHash)

        return Response.json({
            error: false,
            status: 201, // Created
            message: "Account created successfully",
        } satisfies RegisterResponse)

    } catch (error) {
        console.error('Registration error:', error)

        // Generic error response
        return Response.json({
            error: true,
            status: 500,
            message: 'Internal server error'
        } satisfies RegisterResponse)
    }
}