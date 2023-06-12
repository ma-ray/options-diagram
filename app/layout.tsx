import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
      <body className="bg-slate-500 mx-4">
        <div className="flex justify-center items-center m-10">
          <h1 className='text-2xl'>Options Diagram Project</h1>
        </div>
        {children}
      </body>
    </html>
  )
}
