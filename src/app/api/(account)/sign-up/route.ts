<<<<<<< HEAD
import { createProfile, findProfileByUsername, findProfileByEmail } from "../../../../../prisma/profileQueries";
=======
import { createAccount, findAccountByUsername, findAccountByEmail } from "../../../../../prisma/accountQueries";
>>>>>>> f054e6069bc7470000590410056967d3c53bc794
import { z } from 'zod'

const RegisterSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8)
})

interface RegisterResponse {
    error: boolean
    status: number
    message: string
}

export async function POST(request: Request): Promise<Response> {
    try {
        const body = await request.json()

        // Optional: Validate input
        const result = RegisterSchema.safeParse(body)
        if (!result.success) {
            return Response.json({
                error: true,
                status: 400,
                message: 'Invalid input data'
            })
        }

        const { username, email, password } = body

        // Check if username or email already exists
<<<<<<< HEAD
        const existingUsername = await findProfileByUsername(username)
=======
        const existingUsername = await findAccountByUsername(username)
>>>>>>> f054e6069bc7470000590410056967d3c53bc794
        if (existingUsername) {
            return Response.json({
                error: true,
                status: 409, // Conflict
                message: 'Username already exists'
            })
        }

<<<<<<< HEAD
        const existingEmail = await findProfileByEmail(email)
=======
        const existingEmail = await findAccountByEmail(email)
>>>>>>> f054e6069bc7470000590410056967d3c53bc794
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
<<<<<<< HEAD
        await createProfile(username, email, passwordHash)
=======
        await createAccount(username, email, passwordHash)
>>>>>>> f054e6069bc7470000590410056967d3c53bc794

        return Response.json({
            error: false,
            status: 201, // Created
            message: "Account created successfully",
        } satisfies RegisterResponse)

    } catch (error) {
        console.error('Registration error:', error)

        // Check for specific error types
        if (error instanceof z.ZodError) {
            return Response.json({
                error: true,
                status: 400,
                message: 'Invalid input data',
                details: error.errors
            })
        }

        // Generic error response
        return Response.json({
            error: true,
            status: 500,
            message: 'Internal server error'
        } satisfies RegisterResponse)
    }
}