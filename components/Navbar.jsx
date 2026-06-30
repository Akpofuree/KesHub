"use client";
import { LayoutDashboard, Search, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
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

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  return (
    <nav className="relative bg-white">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">
          <Link href="/" className="relative">
            <BrandLogo
              showWordmark={false}
              variant="light"
              className="scale-110 sm:scale-125"
            />
          </Link>

          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>

            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-slate-600"
            >
              <ShoppingCart size={18} />
              Cart
              <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            <div className="flex items-center gap-3">
              {hasClerkKey ? (
                <>
                  <SignedIn>
                    {dashboardHref ? (
                      <Link
                        href={dashboardHref}
                        className="hidden lg:inline-flex items-center gap-2 px-5 py-2 border border-slate-300 hover:border-slate-400 transition text-slate-700 rounded-full"
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
                      className="px-6 py-2 border border-slate-300 hover:border-slate-400 transition text-slate-700 rounded-full"
                    >
                      Login
                    </Link>
                    <Link
                      href="/sign-up"
                      className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
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
                    className="px-6 py-2 border border-slate-300 hover:border-slate-400 transition text-slate-700 rounded-full"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="sm:hidden flex items-center gap-3">
            <button
              className="p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-slate-600"
            >
              <ShoppingCart size={18} />
              <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            {hasClerkKey ? <UserButton afterSignOutUrl="/" /> : null}
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
            <nav className="flex flex-col gap-4">
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
