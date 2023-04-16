import NavBar from "../components/NavBar"

export default function Search() {
    return(
    
    <main className='bg-gray-100 min-h-screen w-screen'>
      <main className='max-w-screen-2xl m-auto bg-white'>
        <NavBar/>
        </main>
        {/* HEADER */}
        <div className='bg-center bg-gradient-to-r from-[#CFCFCF] to-[#3E3E3E] p-2'>
          {/* SEARCHBAR */}
          <div className='rounded overflow-hidden text-lg text-left py-3 m-auto flex justify-center'>
              <input className='rounded mr-3 width=[470px] px-2' type='text' placeholder='State, city or town'></input>
              <button className='rounded bg-black py-2 px-9 text-white'>Let's go</button>
            </div>
            {/* SEARCHBAR */}
        </div>
        {/* HEADER */}
        <div className='flex py-4 m-auto w-2/3 justify-between items start'>
          {/* SEARCH SIDE BAR */}
          <div className='w-1/5'>
            <div className='border-b pb-4'>
              <h1 className='mb-2'>Region</h1>
              <p className='font-light text-reg'>Toronto</p>
              <p className='font-light text-reg'>Ottawa</p>
              <p className='font-light text-reg'>Montreal</p>
              <p className='font-light text-reg'>Kingston</p>
              <p className='font-light text-reg'>Niagara</p>
            </div>
            <div className='border-b pb-4 mt-3'>
              <h1 className='mb-2'>Cuisine</h1>
              <p className='font-light text-reg'>French</p>
              <p className='font-light text-reg'>Italian</p>
              <p className='font-light text-reg'>Mediterranean</p>
              <p className='font-light text-reg'>Mexican</p>
              <p className='font-light text-reg'>Asiatic</p>
            </div>
            <div className='mt-3 pb-4'>
              <h1 className='mb-2'>Price</h1>
              <div className='flex'>
                <button className='border w-full text-reg font-light rounded-l p-2'>
                  $
                </button>
                <button className='border-r border-t border-b w-full text-reg font-light p-2'>
                  $$
                </button>
                <button className='border-r border-t border-b w-full text-reg font-light rounded-r p-2'>
                  $$$
                </button>
              </div>
            </div>
          </div>
          {/* SEARCH SIDE BAR */}
          <div className='w-5/6'>
            {/* RESTARUANT CARD */}
            <div className='border-b flex pb-5'>
              <img className='w-44 rounded' src='https://resizer.otstatic.com/v2/photos/legacy/3/47921503.png' alt='' ></img>
              <div className='pl-5'>
                <h2 className='text-3xl'>Restaurant Kato</h2>
                <div className='flex items-start'>
                  <div className='flex mb-2'>****</div>
                  <p className='ml-2 text-sm'>Awesome</p>
                </div>
                <div className="mb-9">
                  <div className="font-light flex text-reg">
                    <p className="mr-4">$$$</p>
                    <p className="mr-4">Japaneese</p>
                    <p className="mr-4">Ottawa</p>
                  </div>
                </div>
                <div className='text-slate-400'>
                  <a href=''>View more information</a>
                </div>
              </div>
             
            </div>
             {/* RESTARUANT CARD */}
          </div>
        </div>
      </main>
      
    )
}