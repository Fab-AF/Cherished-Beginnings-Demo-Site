import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

// Use it in server contexts
export function auth(...args) {
    return getServerSession(...args, options)
}

// Only use this function in the server side
export async function getUserInfo() {
    const session = await auth()
    return session
}
