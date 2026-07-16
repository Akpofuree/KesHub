"use client";

import { useEffect, useRef, useState } from "react";

const animations = {
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(48px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-48px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(48px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(-48px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  "zoom-in": {
    hidden: { opacity: 0, transform: "scale(0.9)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  "fade-in": {
    hidden: { opacity: 0, transform: "none" },
    visible: { opacity: 1, transform: "none" },
  },
};

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
  style: passedStyle,
  ...rest
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "50px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const anim = animations[animation] || animations["fade-in"];
  const currentState = isVisible ? anim.visible : anim.hidden;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...currentState,
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
        ...passedStyle,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
