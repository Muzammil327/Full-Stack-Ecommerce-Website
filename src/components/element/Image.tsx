import Image from "next/image";

export default function ImageComponent({
  src,
  alt,
  title,
  height,
  width,
  className,
}: {
  src: string;
  alt: string;
  title: string;
  height: number;
  width: number;
  className: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className={className}
      />
    </>
  );
}
