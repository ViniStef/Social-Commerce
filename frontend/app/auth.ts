import {createCookie} from "@remix-run/node";

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
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
});
