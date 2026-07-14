export default function robots() {
  const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";

  if (isStaging) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
  };
}
