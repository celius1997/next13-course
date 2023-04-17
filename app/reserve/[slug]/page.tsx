import Header from "./components/Header"
import ReserveForm from "./components/ReserveForm"

export default function Reserve() {
    return (
        <>
          <div className="border-t h-screen">
            <div className="py-9 m-auto w-3/5">
              <Header/>
              <ReserveForm/>
            </div>
          </div>
        </> 
    )
}