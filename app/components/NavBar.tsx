'use client'
import Link from 'next/link';
import LoginModal from './AuthModal';

function NavBar () {
    return (
        <nav className='bg-white p-2 flex justify-between'>
            <Link href='/' className='font-bold text-gray-700 text-2xl'>
            OpenTable
            </Link>
            <div>
                <div className='flex'>
                    <LoginModal isSignIn={true} className='bg-blue-400 text-white border p-1 px-4 rounded mr-3'/>
                    <LoginModal isSignIn={false} className='border-solid border-blue-400 p-1 px-4 rounded'/>
                </div>
            </div>
        </nav>
    )
}

export default NavBar