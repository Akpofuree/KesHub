"use client";

import { useEffect } from "react";

export default function AOSInit() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      import("aos").then((AOS) => {
        AOS.default.init({
          duration: 800,
          easing: "ease-out-cubic",
          once: true,
          offset: 80,
          mirror: false,
          disable: false,
        });
      });
    }
  }, []);

  return null;
}
