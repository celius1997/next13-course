
/* Root component that is going to render when we go to the main page of our website */
import NavBar from './components/NavBar'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'

const Home = () => {

  return (
    <main className='bg-gray-100 min-h-screen w-screen'>
      <main className='max-w-screen-2xl m-auto bg-white'>
        <NavBar/>
        <main>
            <Header/>
            <div className='py-3 px-36 mt-10 flex flex-wrap'>
              <RestaurantCard/>
            </div>
        </main>
      </main>
    </main>
  )
}

export default Home;