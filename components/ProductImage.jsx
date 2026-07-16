import Image from "next/image";

export default function ProductImage({
  src,
  alt = "",
  className = "",
  priority = false,
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      className={className}
      sizes="(max-width:768px) 100vw, 33vw"
    />
  );
}
