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
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  )
}
