"use client";
import {
  LayoutDashboard,
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import BrandLogo from "@/components/BrandLogo";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.total);
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role;
  const dashboardHref =
    role === "ADMIN" ? "/admin" : role === "SELLER" ? "/store" : null;
  const dashboardLabel = role === "ADMIN" ? "Admin dashboard" : "Dashboard";

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/cart")
      .then(async (res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const text = await res.text();
        return text ? JSON.parse(text) : null;
      })
      .then((data) => {
        if (data && data.items) {
          import("@/lib/features/cart/cartSlice").then(({ setCart }) => {
            dispatch(setCart(data));
          });
        }
      })
      .catch((err) => console.error("Failed to load cart", err));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  return (
    <nav className="relative bg-white border-b border-gray-200">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 gap-4 md:gap-8 transition-all">
          {/* Logo - Left */}
          <Link href="/" className="relative flex-shrink-0">
            <BrandLogo
              showWordmark={false}
              variant="light"
              className="scale-110 sm:scale-125"
            />
          </Link>

          {/* Nav Links & Actions - Right */}
          <div className="hidden md:flex items-center gap-6 text-slate-600 font-medium ml-auto">
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/"
                className="hover:text-emerald-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="hover:text-emerald-600 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="hover:text-emerald-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-emerald-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-5 border-l border-slate-200 pl-6 ml-2">
              <form
                onSubmit={handleSearch}
                className="group flex items-center justify-end overflow-hidden rounded-full border border-transparent bg-white shadow-sm transition-all duration-300 hover:border-slate-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500"
              >
                <input
                  className="w-0 min-w-0 bg-transparent px-0 py-2 text-sm outline-none placeholder-slate-500 text-slate-800 opacity-0 transition-all duration-300 group-hover:w-64 group-hover:px-4 group-hover:opacity-100 group-focus-within:w-64 group-focus-within:px-4 group-focus-within:opacity-100"
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                  aria-label="Search"
                  type="submit"
                >
                  <Search size={22} />
                </button>
              </form>

              <Link
                href="/wishlist"
                className="relative flex items-center text-slate-600 hover:text-emerald-600 transition-colors"
                title="Wishlist"
              >
                <Heart size={22} />
              </Link>
              <Link
                href="/cart"
                className="relative flex items-center text-slate-600 hover:text-emerald-600 transition-colors"
                title="Cart"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 text-[10px] font-bold text-white bg-emerald-600 h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="flex items-center gap-3">
                {hasClerkKey ? (
                  <>
                    <SignedIn>
                      {dashboardHref ? (
                        <Link
                          href={dashboardHref}
                          className="flex items-center gap-2 px-4 py-2 border border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition text-slate-700 rounded-full text-sm"
                        >
                          <LayoutDashboard size={16} />
                          {dashboardLabel}
                        </Link>
                      ) : null}
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                      <Link
                        href="/sign-in"
                        className="px-5 py-2 text-sm border border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition text-slate-700 rounded-full"
                      >
                        Login
                      </Link>
                    </SignedOut>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href="/wishlist"
              className="relative flex items-center text-slate-600"
            >
              <Heart size={22} />
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[10px] font-bold text-white bg-emerald-600 h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {hasClerkKey ? (
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            ) : null}
            <button
              className="p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 h-full w-72 bg-white shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setMenuOpen(false)} className="mb-6">
              <X className="w-6 h-6" />
            </button>
            <nav className="flex flex-col gap-4 text-sm">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600"
              >
                Shop
              </Link>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600"
              >
                Contact
              </Link>
              <div className="h-px bg-slate-200 my-2" />
              <Link
                href="/shop?category=PHONES"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600"
              >
                Phones
              </Link>
              <Link
                href="/shop?category=LAPTOPS"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600"
              >
                Laptops
              </Link>
              <Link
                href="/shop?category=HEADPHONES"
                onClick={() => setMenuOpen(false)}
                className="text-slate-600"
              >
                Headphones
              </Link>
              <div className="h-px bg-slate-200 my-2" />
              {hasClerkKey ? (
                <>
                  <SignedIn>
                    {dashboardHref && (
                      <Link
                        href={dashboardHref}
                        onClick={() => setMenuOpen(false)}
                        className="text-slate-600"
                      >
                        {dashboardLabel}
                      </Link>
                    )}
                  </SignedIn>
                  <SignedOut>
                    <Link
                      href="/sign-in"
                      onClick={() => setMenuOpen(false)}
                      className="text-slate-600"
                    >
                      Login
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMenuOpen(false)}
                      className="text-slate-600"
                    >
                      Sign up
                    </Link>
                  </SignedOut>
                </>
              ) : null}
              {!hasClerkKey && (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="text-slate-600"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
