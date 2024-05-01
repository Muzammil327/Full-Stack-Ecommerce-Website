export default function Container({ children }: { children: React.ReactNode }) {
    return (
      <div className="container mx-auto 2xl:px-24 xl:px-20 lg:px-16 md:px-12 sm:px-8 px-3">
        {children}
      </div>
    )
  }
  