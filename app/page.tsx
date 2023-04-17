
/* Root component that is going to render when we go to the main page of our website */
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'


export default function Home() {
  return (
    <>
        <Header/>
        <div className='py-3 px-36 mt-10 flex flex-wrap'>
          <RestaurantCard/>
        </div>
    </>
  )
}

