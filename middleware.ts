// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(req:NextRequest){
//     let jwt = req.cookies.get("next-auth.session-token")?.value;
//     let url = req.url
//     const redirecturl = `${req.nextUrl.origin}`
//     if(jwt===undefined)
//     return NextResponse.redirect(redirecturl+'/login');
//     else if(jwt!=undefined && req.url.includes('login'))
//     return NextResponse.redirect(redirecturl)
//     else
//     return NextResponse.next()
// }


export { default } from "next-auth/middleware"

export const config = { matcher: ["/"] }