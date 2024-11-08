import {findComment, updateContent} from "../../../../prisma/commentQueries";

export async function GET(request: Request, { params }: { params: Promise<{ commentId: string }>}) {
    // jwt verify here
    const commentId = (await params).commentId
    const comment = await findComment(parseInt(commentId))

    return Response.json(comment)
}

export async function PUT(request: Request) {

}