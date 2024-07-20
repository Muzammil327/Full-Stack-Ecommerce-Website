import React from "react";
import Image from "next/image";

interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: "lazy" | "eager" | undefined;
}

export default function ImageContainer({
  src,
  alt,
  className,
  sizes,
  width,
  height,
  loading,
  priority = false,
}: ImageContainerProps) {
  return (
    <Image
      src={src}
      alt={alt}
      title={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      priority={priority}
      sizes={sizes}
      style={{ objectFit: "contain" }} // Example style, adjust as needed
    />
  );
}
