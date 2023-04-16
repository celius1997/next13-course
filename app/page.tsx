import Image from 'next/image'
import { Raleway } from '@next/font/google'
import styles from './page.module.css'

const font = Raleway({
  weight: ['100','200','300','400','500','600','700','800','900'],
  subsets: ['latin']
})

export default function Home() {
  return (
    <main></main>
  )
}
