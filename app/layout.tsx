import './globals.css'
import { Raleway } from '@next/font/google'

const font = Raleway({
  weight: ['100','200','300','400','500','600','700','800','900'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={font.className}>{children}</body>
    </html>
  )
}
