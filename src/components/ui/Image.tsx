import React from "react";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  layout?: "responsive" | "fill" | undefined;
  className?: string;
  sizes?: string;
  width: number;
  height: number;
  priority?: boolean;
}

export default function ImageContainer({
  src,
  alt,
  layout,
  className,
  width,
  height,
  priority,
  sizes,
}: ImageProps) {
  return (
    <div title={alt}>
      <Image
        src={src}
        alt={alt}
        layout={layout}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}
