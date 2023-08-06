export { default } from "next-auth/middleware"

export const config = { matcher: ["/","/products/:path*","/categories/:path*/:path*","/cart","/profile/:path*","/payment","/orderconfirmation/:path*"] }