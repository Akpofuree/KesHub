import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/store(.*)"]);
const isStagingAccessRoute = createRouteMatcher(["/staging-access(.*)"]);

function isStagingRequest(request) {
  return process.env.NEXT_PUBLIC_ENV === "staging";
}

function hasStagingAccess(request) {
  const secret = process.env.STAGING_ACCESS_SECRET;
  if (!secret) {
    return false;
  }

  const headerToken = request.headers.get("x-staging-access");
  const cookieToken = request.cookies.get("staging_access")?.value;
  return headerToken === secret || cookieToken === secret;
}

export default clerkMiddleware(async (auth, request) => {
  if (isStagingRequest(request) && !isStagingAccessRoute(request)) {
    if (!hasStagingAccess(request)) {
      return NextResponse.redirect(new URL("/staging-access", request.url));
    }
  }

  if (!isProtectedRoute(request)) return;

  await auth.protect();

  // Additional role-based protection for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
