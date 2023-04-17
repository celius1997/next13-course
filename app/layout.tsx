import NavBar from './components/NavBar'
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
    <html lang="en"><head />
      <body className={font.className}>
        <main className='bg-gray-100 w-screen'>
          <main className='max-w-screen-2xl m-auto bg-white'>
            <NavBar/>
          </main>
        </main>
        {children}
      </body>
    </html>
  )
}
