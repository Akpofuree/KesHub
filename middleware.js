import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isStagingAccessRoute = (pathname) => pathname.startsWith("/staging-access");

export default clerkMiddleware((auth, request) => {
  if (process.env.NEXT_PUBLIC_ENV === "staging") {
    const secret = process.env.STAGING_ACCESS_SECRET;
    const pathname = request.nextUrl.pathname;

    if (secret && !isStagingAccessRoute(pathname)) {
      const headerToken = request.headers.get("x-staging-access");
      const cookieToken = request.cookies.get("staging_access")?.value;

      if (headerToken !== secret && cookieToken !== secret) {
        return NextResponse.redirect(new URL("/staging-access", request.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
