import NavBar from "../../components/NavBar"
import Header from "./components/Header"
import ReserveForm from "./components/ReserveForm"

export default function Reserve() {
    return (
        <main className='bg-gray-100 min-h-screen w-screen'>
          <main className='max-w-screen-2xl m-auto bg-white'>
            <NavBar/>
              <div className="border-t h-screen">
                <div className="py-9 m-auto w-3/5">
                  <Header/>
                  <ReserveForm/>
                </div>
              </div>
            </main>
          </main>   
    )
}