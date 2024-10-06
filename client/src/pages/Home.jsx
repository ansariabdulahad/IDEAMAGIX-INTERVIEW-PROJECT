import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex flex-col gap-6 w-full h-full'>
            <h2>Welcome to the online prescription platform</h2>
            <div className='flex gap-6 justify-center'>
                <Link to={'/doctor'}>
                    <Button>Doctor Signup</Button>
                </Link>
                <Link to={'/patient'}>
                    <Button>Patient Signup</Button>
                </Link>
            </div>
        </div>
    )
}

export default Home