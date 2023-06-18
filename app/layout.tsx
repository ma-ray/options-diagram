import './globals.css'

export const metadata = {
  title: 'Options Diagram',
  description: 'View finanical options',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  )
}
