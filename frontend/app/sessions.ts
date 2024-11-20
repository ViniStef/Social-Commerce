import {createCookieSessionStorage} from "@remix-run/node";

type SessionData = {
    userId: string,
    accountType: string
}

type SessionFlashData = {
    error: string
}

const {getSession, commitSession, destroySession} = createCookieSessionStorage<SessionData, SessionFlashData>(
    {
        cookie: {name: "auth"}
    }
)

export { getSession, commitSession, destroySession };
