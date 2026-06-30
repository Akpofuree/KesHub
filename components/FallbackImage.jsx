'use client'
import { useState } from "react";
import Image from "next/image";

export default function FallbackImage({ src, fallbackSrc, alt = "", ...props }) {
    const [currentSrc, setCurrentSrc] = useState(src);

    return (
        <Image
            {...props}
            src={currentSrc}
            alt={alt}
            onError={() => {
                if (fallbackSrc && currentSrc !== fallbackSrc) {
                    setCurrentSrc(fallbackSrc);
                }
            }}
        />
    );
}

