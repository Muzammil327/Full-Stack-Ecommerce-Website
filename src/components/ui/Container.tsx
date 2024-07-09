export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
      {children}
    </section>
  );
}
