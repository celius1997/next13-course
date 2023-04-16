
export default function Reviews() {
  return (
    <div>
        <h1 className='font-bold text-3xl mt-10 mb-7 border-p pb-5'>
            What 100 people are saying
        </h1>
        <div>
        {/* REVIEWCARD */}
        <div className="border-b pb-7 mb-7">
            <div className='flex'>
                <div className='w-1/6 flex flex-col items-center'>
                    <div className='rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center'>
                        <h2 className='text-white text-2xl'>MJ</h2>
                    </div>
                    <p className='text-center pt-1'>Michael Jordan</p>
                </div>
                <div className='ml-10 w-5/6'>
                    <div className='flex items-center'>
                        <div className='flex mr-5'>******</div>
                    </div>
                    <div className='mt-5'>
                        <p className='text-lg font-light'>
                        A lucky find on a Saturday evening. We were given great guidance on the menu and wine options and both proved to be excellent. We loved the salmon tartare with mango and the fish stew.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {/* REVIEWCARD */}
        </div>
    </div>
  )
}
