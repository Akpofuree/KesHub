"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";

export default function AuthForm({ mode, role }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clerk = useClerk();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignIn = mode === "signin";
  // Check if user is admin via Clerk Organizations
  const isOrgAdmin = formData?.organizationMemberships?.some(
    (org) => org.role === "org:admin",
  );
  const isAdmin = isOrgAdmin;
  const destination =
    searchParams.get("redirect_url") || (isAdmin ? "/admin" : "/");

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInLoaded) return;
    setLoading(true);
    setError("");
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(destination);
        router.refresh();
        return;
      }
      setError("Invalid email or password");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    setLoading(true);
    setError("");
    try {
      await clerk.load();

      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        unsafeMetadata: { role: isAdmin ? "ADMIN" : "USER" },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      if (result) {
        setRequiresVerification(true);
      }
    } catch {
      setError("Unable to complete sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    setLoading(true);
    setError("");
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(destination);
        router.refresh();
        return;
      }
      setError("Invalid verification code");
    } catch {
      setError("Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const roleLabel = isAdmin ? "Admin" : "Customer";

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-600">
          {roleLabel} {isSignIn ? "Sign In" : "Sign Up"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          {isSignIn ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {isAdmin
            ? "Admin access requires approval code."
            : "Continue as a customer and shop from KES HUB."}
        </p>
      </div>

      <form
        onSubmit={
          isSignIn
            ? handleSignIn
            : requiresVerification
              ? handleVerification
              : handleSignUp
        }
        className="space-y-4"
      >
        {!isSignIn && !requiresVerification && (
          <div className="grid grid-cols-2 gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>
        )}
        {!requiresVerification ? (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </>
        ) : (
          <input
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Email verification code"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
        )}
        {!isSignIn && !requiresVerification && (
          <div id="clerk-captcha" className="flex justify-center" />
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : isSignIn
              ? `Sign in as ${roleLabel}`
              : requiresVerification
                ? "Verify email"
                : `Sign up as ${roleLabel}`}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="hover:text-slate-900"
        >
          {isSignIn ? "Need an account?" : "Already have an account?"}
        </Link>
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
      </div>
    </div>
  );
}
