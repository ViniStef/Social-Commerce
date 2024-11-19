import {createCookie, createCookieSessionStorage, redirect} from "@remix-run/node";

let secret = process.env.COOKIE_SECRET || "default";
if (secret === "default") {
    console.warn("O Aplicativo está vulnerável sem um cookie secret");
    secret = "default-secret";
}

export let authCookie = createCookie("auth", {
    httpOnly: true,
    path: "/feed",
    sameSite: "lax",
    secrets: [secret],
    secure: false,
    maxAge: 60 * 60 * 24 * 30,
});

export async function getAuthFromRequest(
    request: Request,
): Promise<string | null> {
    let userId = await authCookie.parse(request.headers.get("Cookie"));

    console.log("TESTE AKI EM CIMA ULTIMO", request.headers);
    return userId ?? null;
}


export async function requireAuthCookie(request: Request) {
    let userId = await getAuthFromRequest(request);
    if (!userId) {
        return null;
        throw redirect("/feed", {
            headers: {
                "Set-Cookie": await authCookie.serialize("", {
                    maxAge: 0,
                }),
            },
        });
    }

    return null;
    console.log("user id teste akii: ", userId)

    return userId;
}

export async function setAuthOnResponse(
    response: Response,
    userId: string,
): Promise<Response> {
    let header = await authCookie.serialize(userId);
    console.log("aqqqqq: ", header);
    response.headers.append("Set-Cookie", header);

    return response;
}


