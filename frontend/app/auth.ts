import {createCookieSessionStorage, redirect} from "@remix-run/node";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
    console.warn("O Aplicativo está vulnerável sem um cookie secret");
    secret = "default-secret";
}

type SessionData = {
    userId: string,
    accountType: string
}

type SessionFlashData = {
    error: string
}

export const {getSession, commitSession, destroySession} = createCookieSessionStorage<SessionData, SessionFlashData>(
    {
        cookie: {
            name: "auth",
            httpOnly: true,
            path: `/`,
            sameSite: "lax",
            secrets: [secret],
            secure: false,
            maxAge: 60 * 60 * 24 * 30,
        }

    }
)

export async function getAuthFromRequest(
    request: Request,
): Promise<{userId: string | undefined, accountType:string | undefined}> {
    const sessionLoader = await getSession(request.headers.get("Cookie"));
    let userId = sessionLoader.get("userId");
    let accountType = sessionLoader.get("accountType");
    return {userId, accountType};
}

export async function requireAuthCookie(request: Request) {
    let {userId, accountType} = await getAuthFromRequest(request);
    const session = await getSession(
        request.headers.get("Cookie")
    )
    if (!userId) {
        throw redirect("/login", {
            headers: {
                "Set-Cookie": await destroySession(session),
            },
        });
    }
    return { userId, accountType };
}

export async function redirectAndClearCookie(request: Request) {
    const session = await getSession(
        request.headers.get("Cookie")
    )
    throw redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });

}

