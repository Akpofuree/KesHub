import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkAuthLimit } from "@/lib/rate-limit";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/store(.*)"]);
const isStagingAccessRoute = createRouteMatcher(["/staging-access(.*)"]);
const isAuthEntryRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

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

  if (isAuthEntryRoute(request)) {
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";
    const limitResult = await checkAuthLimit(`auth-entry:${clientIp}:${request.nextUrl.pathname}`);

    if (!limitResult.success) {
      return NextResponse.redirect(new URL("/staging-access", request.url));
    }
  }

  if (!isProtectedRoute(request)) return;

  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
