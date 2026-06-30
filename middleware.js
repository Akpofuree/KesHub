import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/store(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    if (!isProtectedRoute(request)) return;

    await auth.protect();
});

export const config = {
    matcher: ["/admin(.*)", "/store(.*)"],
};
