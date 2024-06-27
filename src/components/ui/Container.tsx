export default function Container({ children }: { children: React.ReactNode }) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </section>
    )
  }
  