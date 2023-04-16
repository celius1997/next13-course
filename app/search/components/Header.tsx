export default function Header() {
    return(
        <div className='bg-center bg-gradient-to-r from-[#CFCFCF] to-[#3E3E3E] p-2'>
          {/* SEARCHBAR */}
          <div className='rounded overflow-hidden text-lg text-left py-3 m-auto flex justify-center'>
              <input className='rounded mr-3 width=[470px] px-2' type='text' placeholder='State, city or town'></input>
              <button className='rounded bg-black py-2 px-9 text-white'>Let's go</button>
            </div>
            {/* SEARCHBAR */}
        </div>
    )
}