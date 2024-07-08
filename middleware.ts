import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/products",
    "/products/:id",
    "/store",
    "/categories",
    "/contact",
    "/office",
    "/office/productsList",
    "/office/brand",
    "/office/category",
  ],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
