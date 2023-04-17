import SearchBar from "./SearchBar";

export default function Header ()  {
    
    return (
      <div className='h-64 bg-gradient-to-r from-[#CFCFCF] to-[#3E3E3E]'>
          <div className='text-center mt-10'>
            <h1 className='text-white text-5xl font-bold mb-2'>Find your table for any ocassion</h1>
          </div>
          <SearchBar/>
        </div>
    )
}