export default function Container({ children }: { children: React.ReactNode }) {
    return (
      <div className="container mx-auto 2xl:px-16 xl:px-10 lg:px-8 md:px-6 sm:px-4 px-2">
        {children}
      </div>
    )
  }
  